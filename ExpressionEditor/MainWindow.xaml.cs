using ICSharpCode.AvalonEdit.CodeCompletion;
using ICSharpCode.AvalonEdit.Highlighting;
using Microsoft.Bot.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ExpressionEditor
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private ExpressionEngine engine = new ExpressionEngine();

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(Object sender, RoutedEventArgs e)
        {
            var path = System.IO.Path.Combine(Environment.GetEnvironmentVariable("LOCALAPPDATA"), "expressioneditor.json");
            if (File.Exists(path))
            {
                dynamic setting = JsonConvert.DeserializeObject(File.ReadAllText(path));
                path = (string)setting.path;
                if (File.Exists(path))
                {
                    this.DataLabel.Content = path;
                    dataEditor.Text = File.ReadAllText(path);
                }
            }

            if (String.IsNullOrEmpty(dataEditor.Text))
            {
                dataEditor.Text = @"{
  ""conversation"": 
  {
     ""firstName"": ""John"",
     ""lastName"" : ""doe"",
     ""age""      : 26,
     ""address""  : {
                ""streetAddress"": ""naist street"",
       ""city""         : ""Nara"",
       ""postalCode""   : ""630-0192""
     },
     ""phoneNumbers"": [
       {
         ""type""  : ""iPhone"",
         ""number"": ""0123-4567-8888""
       },
       {
         ""type""  : ""home"",
         ""number"": ""0123-4567-8910""
       }
     ]
   }
}";
            }

            dataEditor.SyntaxHighlighting = HighlightingManager.Instance.GetDefinition("Json");
            dataEditor.ShowLineNumbers = true;
            outputEditor.SyntaxHighlighting = HighlightingManager.Instance.GetDefinition("Json");
            outputEditor.ShowLineNumbers = true;
            expressionEditor.SyntaxHighlighting = HighlightingManager.Instance.GetDefinition("Json");
            this.expressionEditor.TextArea.TextEntering += this.TextArea_TextEntering;
            this.expressionEditor.TextArea.TextEntered += this.TextArea_TextEntered;
            this.expressionEditor.TextArea.KeyUp += this.TextArea_KeyUp;
        }

        private void DataLabel_Click(Object sender, RoutedEventArgs e)
        {
            var openFileDialog = new System.Windows.Forms.OpenFileDialog();
            if (openFileDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                var path = System.IO.Path.Combine(Environment.GetEnvironmentVariable("LOCALAPPDATA"), "expressioneditor.json");
                dynamic settings = new JObject();
                settings.path = openFileDialog.FileName;
                File.WriteAllText(path, JsonConvert.SerializeObject(settings));
                if (File.Exists(openFileDialog.FileName))
                {
                    this.DataLabel.Content = openFileDialog.FileName;
                    dataEditor.Text = File.ReadAllText(openFileDialog.FileName);
                }
            }
        }

        private void TextArea_KeyUp(Object sender, KeyEventArgs e)
        {
            if (this.completionWindow != null)
            {
                if (this.expressionEditor.CaretOffset < this.completionWindow.StartOffset || this.expressionEditor.CaretOffset == 0)
                {
                    completionWindow.Close();
                    completionWindow = null;
                }
            }
        }

        CompletionWindow completionWindow;

        private void TextArea_TextEntered(Object sender, TextCompositionEventArgs e)
        {
            var offset = expressionEditor.CaretOffset;
            if (offset > 0)
            {
                var subString = expressionEditor.Text.Substring(0, offset);
                if (subString.Length > 0)
                {
                    if (completionWindow == null)
                    {
                        var lastChar = subString[subString.Length - 1];
                        var isBoundary = (offset == 1) || !Char.IsLetterOrDigit(subString[subString.Length - 2]);
                        if (!isBoundary)
                        {
                            return;
                        }

                        var matches = this.functions.Where(f => f[0] == lastChar);
                        if (matches.Any())
                        {
                            // Open code completion if we have possible functions
                            completionWindow = new CompletionWindow(expressionEditor.TextArea);
                            completionWindow.Width = this.Width / 2;
                            completionWindow.CloseAutomatically = true;
                            completionWindow.StartOffset--; // start of char
                            IList<ICompletionData> data = completionWindow.CompletionList.CompletionData;
                            foreach (var match in matches)
                            {
                                data.Add(new CompletionData(match));
                            }

                            completionWindow.Show();
                            completionWindow.Closed += delegate
                            {
                                completionWindow = null;
                            };
                        }
                    }
                    else
                    {
                        subString = subString.Substring(completionWindow.StartOffset);
                        var matches = this.functions.Where(f => f.StartsWith(subString));
                        if (!matches.Any())
                        {
                            completionWindow.Close();
                            completionWindow = null;
                        }
                    }
                }
            }
        }

        private void TextArea_TextEntering(Object sender, TextCompositionEventArgs e)
        {
            if (e.Text.Length > 0 && completionWindow != null)
            {
                if (!char.IsLetterOrDigit(e.Text[0]))
                {
                    var offset = expressionEditor.CaretOffset;
                    if (offset > 0)
                    {
                        var subString = expressionEditor.Text.Substring(0, offset);
                        if (subString.EndsWith(e.Text))
                        {
                            // Whenever a non-letter is typed while the completion window is open,
                            // insert the currently selected element.
                            completionWindow.CompletionList.RequestInsertion(e);
                        }
                    }
                }
            }
            // Do not set e.Handled=true.
            // We still want to insert the character that was typed
        }

        private void expressionEditor_TextChanged(Object sender, EventArgs e)
        {
            try
            {
                var memory = JsonConvert.DeserializeObject<Dictionary<string, object>>(dataEditor.Text);
                var (result, err) = engine.Parse(expressionEditor.Text).TryEvaluate(memory);
                this.errorMessage.Text = err;
                this.errorMessage.Visibility = err == null ? Visibility.Collapsed : Visibility.Visible;
                outputEditor.Text = JsonConvert.SerializeObject(result, new JsonSerializerSettings() { Formatting = Formatting.Indented, NullValueHandling = NullValueHandling.Ignore });
            }
            catch (Exception err)
            {
                this.errorMessage.Text = err.Message;
                this.errorMessage.Visibility = err == null ? Visibility.Collapsed : Visibility.Visible;
                outputEditor.Text = string.Empty;
            }
        }

        public List<string> functions = new List<string>()
        {
            // Math
            "min(value1, value2)",
            "max(value1, value2)",
            "average(array)",
            "sum(array)",
            "range(array, count)",

            // Comparisons
            "exists(property)",

            // Logic

            // String
            "length(string)",
            "replace(new, old)",
            "replaceIgnoreCase(new, old)",
            "split(string, splitCharsAsString)",
            "substring(string, start, length)",
            "toLower(string)",
            "toUpper(string)",
            "trim(string)",
            "endsWith(string, val)",
            "startsWith(string, val)",
            "countWord(string)",
            "addOrdinal(string)",
            "newGuid()",
            "indexOf(stringOrArray, string)",
            "lastIndexOf(string, string)",

            // Collection
            "count(array)",
            "contains(array, value)",
            "empty(array)",
            "join(array, array)",
            "first(array)",
            "last(array)",
            "foreach(array, itemName, selectExpression)",
            "select(array, itemName, selectExpression)",
            "where(array, itemName, filterExpression)",
            "union(array, array)",
            "intersection(array, array)",
            "skip(array, number)",
            "take(array, number)",
            "subArray(array, start, end)",
            "sortBy(array, propertyName)",
            "sortByDescending(array, propertyName)",
            "indicesAndValues(array)",

            // DateTime
            "addDays(date, days)",
            "addHours(date, hours)",
            "addMinutes(date, minutes)",
            "addSeconds(date, seconds)",
            "dayOfMonth(date)",
            "dayOfWeek(date)",
            "dayOfYear(date)",
            "month(date)",
            "date(date)",
            "year(date)",
            "utcNow()",
            "formatDateTime(date, format)",
            "subtractFromTime(date, timespan)",
            "dateReadBack(date1, date2)",
            "getTimeOfDay(date)",
            "getFutureTime(date, format)",
            "getPastTime(date, format)",
            "convertFromUTC(date, format)",
            "convertToUTC(date, format)",
            "addToTime(time, interval, timeUnit, format)",
            "startOfDay(time, format)",
            "startOfHour(time, format)",
            "startOfMonth(date, format)",
            "ticks(date)",

            // Conversions
            "float(property)",
            "int(property)",
            "string(property)",
            "bool(property)",
            "array(property)",
            "binary(property)",
            "base64(property",
            "base64ToBinary(property)",
            "base64ToString(property)",
            "dataUri(property)",
            "dataUriToBinary(property)",
            "dataUriToString(property)",
            "uriComponent(property)",
            "uriComponentToString(property)",
            "xml(property)",

            // URI Parsing Functions
            "uriHost(property)",
            "uriPath(property)",
            "uriPathAndQuery(property)",
            "uriPort(property)",
            "uriQuery(property)",
            "uriScheme(property)",

            // Memory
            "Accessor",
            "Element",
            "createArray",

            // Misc
            "Constant",
            "Lambda",
            "if",
            "rand",

            // Object manipulation and construction functions
            "json(property)",
            "getProperty(property)",
            "addProperty(property, value)",
            "removeProperty(property)",
            "setProperty(property, value)",
            "coalesce",
            "xPath(property, xPathString)",
            "setPathToValue(property, value)",
            "jPath(property, jPathString)",

            // Regular expression
            "isMatch(property, regularExpression)",
        };
    }
}
