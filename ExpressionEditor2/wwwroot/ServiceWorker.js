const baseURL = '/';
const indexURL = '/index.html';
const networkFetchEvent = 'fetch';
const swInstallEvent = 'install';
const swInstalledEvent = 'installed';
const swActivateEvent = 'activate';
const staticCachePrefix = 'blazor-cache-v';
const staticCacheName = 'blazor-cache-v12';
const requiredFiles = [
"/_framework/blazor.boot.json",
"/_framework/blazor.server.js",
"/_framework/blazor.webassembly.js",
"/_framework/wasm/mono.js",
"/_framework/wasm/mono.wasm",
"/_framework/_bin/AdaptiveExpressions.dll",
"/_framework/_bin/Antlr4.Runtime.dll",
"/_framework/_bin/Blazaco.dll",
"/_framework/_bin/BlazorCssGrid.dll",
"/_framework/_bin/Blazorise.Bootstrap.dll",
"/_framework/_bin/Blazorise.Components.dll",
"/_framework/_bin/Blazorise.dll",
"/_framework/_bin/Blazorise.Icons.FontAwesome.dll",
"/_framework/_bin/BlazorStyled.dll",
"/_framework/_bin/ExpressionEditor2.dll",
"/_framework/_bin/ExpressionEditor2.pdb",
"/_framework/_bin/Faso.Blazor.SpinKit.dll",
"/_framework/_bin/Humanizer.dll",
"/_framework/_bin/Humanizer.resources.dll",
"/_framework/_bin/Iciclecreek.AdaptiveExpressions.Humanizer.dll",
"/_framework/_bin/Microsoft.AspNetCore.Authorization.dll",
"/_framework/_bin/Microsoft.AspNetCore.Blazor.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.Forms.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.Web.dll",
"/_framework/_bin/Microsoft.AspNetCore.Metadata.dll",
"/_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll",
"/_framework/_bin/Microsoft.CSharp.dll",
"/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll",
"/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.Options.dll",
"/_framework/_bin/Microsoft.Extensions.Primitives.dll",
"/_framework/_bin/Microsoft.JSInterop.dll",
"/_framework/_bin/Microsoft.Recognizers.Text.DataTypes.TimexExpression.dll",
"/_framework/_bin/Mono.Security.dll",
"/_framework/_bin/Mono.WebAssembly.Interop.dll",
"/_framework/_bin/mscorlib.dll",
"/_framework/_bin/Newtonsoft.Json.dll",
"/_framework/_bin/System.Buffers.dll",
"/_framework/_bin/System.ComponentModel.Annotations.dll",
"/_framework/_bin/System.Core.dll",
"/_framework/_bin/System.Data.dll",
"/_framework/_bin/System.dll",
"/_framework/_bin/System.Drawing.Common.dll",
"/_framework/_bin/System.Memory.dll",
"/_framework/_bin/System.Net.Http.dll",
"/_framework/_bin/System.Numerics.dll",
"/_framework/_bin/System.Numerics.Vectors.dll",
"/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll",
"/_framework/_bin/System.Runtime.Serialization.dll",
"/_framework/_bin/System.ServiceModel.Internals.dll",
"/_framework/_bin/System.Text.Encodings.Web.dll",
"/_framework/_bin/System.Text.Json.dll",
"/_framework/_bin/System.Threading.Tasks.Extensions.dll",
"/_framework/_bin/System.Xml.dll",
"/_framework/_bin/System.Xml.Linq.dll",
"/css/bootstrap/bootstrap.min.css",
"/css/bootstrap/bootstrap.min.css.map",
"/css/open-iconic/FONT-LICENSE",
"/css/open-iconic/font/css/open-iconic-bootstrap.min.css",
"/css/open-iconic/font/fonts/open-iconic.eot",
"/css/open-iconic/font/fonts/open-iconic.otf",
"/css/open-iconic/font/fonts/open-iconic.svg",
"/css/open-iconic/font/fonts/open-iconic.ttf",
"/css/open-iconic/font/fonts/open-iconic.woff",
"/css/open-iconic/ICON-LICENSE",
"/css/open-iconic/README.md",
"/css/site.css",
"/default-icon-192x192.png",
"/default-icon-512x512.png",
"/index.html",
"/lib/monaco-editor/min-maps/vs/base/worker/workerMain.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.de.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.es.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.fr.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.it.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.ja.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.ko.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.ru.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.zh-cn.js.map",
"/lib/monaco-editor/min-maps/vs/editor/editor.main.nls.zh-tw.js.map",
"/lib/monaco-editor/min-maps/vs/loader.js.map",
"/lib/monaco-editor/min/vs/base/worker/workerMain.js",
"/lib/monaco-editor/min/vs/basic-languages/apex/apex.js",
"/lib/monaco-editor/min/vs/basic-languages/azcli/azcli.js",
"/lib/monaco-editor/min/vs/basic-languages/bat/bat.js",
"/lib/monaco-editor/min/vs/basic-languages/clojure/clojure.js",
"/lib/monaco-editor/min/vs/basic-languages/coffee/coffee.js",
"/lib/monaco-editor/min/vs/basic-languages/cpp/cpp.js",
"/lib/monaco-editor/min/vs/basic-languages/csharp/csharp.js",
"/lib/monaco-editor/min/vs/basic-languages/csp/csp.js",
"/lib/monaco-editor/min/vs/basic-languages/css/css.js",
"/lib/monaco-editor/min/vs/basic-languages/dockerfile/dockerfile.js",
"/lib/monaco-editor/min/vs/basic-languages/fsharp/fsharp.js",
"/lib/monaco-editor/min/vs/basic-languages/go/go.js",
"/lib/monaco-editor/min/vs/basic-languages/graphql/graphql.js",
"/lib/monaco-editor/min/vs/basic-languages/handlebars/handlebars.js",
"/lib/monaco-editor/min/vs/basic-languages/html/html.js",
"/lib/monaco-editor/min/vs/basic-languages/ini/ini.js",
"/lib/monaco-editor/min/vs/basic-languages/javascript/javascript.js",
"/lib/monaco-editor/min/vs/basic-languages/java/java.js",
"/lib/monaco-editor/min/vs/basic-languages/kotlin/kotlin.js",
"/lib/monaco-editor/min/vs/basic-languages/less/less.js",
"/lib/monaco-editor/min/vs/basic-languages/lua/lua.js",
"/lib/monaco-editor/min/vs/basic-languages/markdown/markdown.js",
"/lib/monaco-editor/min/vs/basic-languages/msdax/msdax.js",
"/lib/monaco-editor/min/vs/basic-languages/mysql/mysql.js",
"/lib/monaco-editor/min/vs/basic-languages/objective-c/objective-c.js",
"/lib/monaco-editor/min/vs/basic-languages/pascal/pascal.js",
"/lib/monaco-editor/min/vs/basic-languages/perl/perl.js",
"/lib/monaco-editor/min/vs/basic-languages/pgsql/pgsql.js",
"/lib/monaco-editor/min/vs/basic-languages/php/php.js",
"/lib/monaco-editor/min/vs/basic-languages/postiats/postiats.js",
"/lib/monaco-editor/min/vs/basic-languages/powerquery/powerquery.js",
"/lib/monaco-editor/min/vs/basic-languages/powershell/powershell.js",
"/lib/monaco-editor/min/vs/basic-languages/pug/pug.js",
"/lib/monaco-editor/min/vs/basic-languages/python/python.js",
"/lib/monaco-editor/min/vs/basic-languages/razor/razor.js",
"/lib/monaco-editor/min/vs/basic-languages/redis/redis.js",
"/lib/monaco-editor/min/vs/basic-languages/redshift/redshift.js",
"/lib/monaco-editor/min/vs/basic-languages/ruby/ruby.js",
"/lib/monaco-editor/min/vs/basic-languages/rust/rust.js",
"/lib/monaco-editor/min/vs/basic-languages/r/r.js",
"/lib/monaco-editor/min/vs/basic-languages/sb/sb.js",
"/lib/monaco-editor/min/vs/basic-languages/scheme/scheme.js",
"/lib/monaco-editor/min/vs/basic-languages/scss/scss.js",
"/lib/monaco-editor/min/vs/basic-languages/shell/shell.js",
"/lib/monaco-editor/min/vs/basic-languages/solidity/solidity.js",
"/lib/monaco-editor/min/vs/basic-languages/sql/sql.js",
"/lib/monaco-editor/min/vs/basic-languages/st/st.js",
"/lib/monaco-editor/min/vs/basic-languages/swift/swift.js",
"/lib/monaco-editor/min/vs/basic-languages/tcl/tcl.js",
"/lib/monaco-editor/min/vs/basic-languages/typescript/typescript.js",
"/lib/monaco-editor/min/vs/basic-languages/vb/vb.js",
"/lib/monaco-editor/min/vs/basic-languages/xml/xml.js",
"/lib/monaco-editor/min/vs/basic-languages/yaml/yaml.js",
"/lib/monaco-editor/min/vs/editor/editor.main.css",
"/lib/monaco-editor/min/vs/editor/editor.main.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.de.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.es.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.fr.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.it.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.ja.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.ko.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.ru.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.zh-cn.js",
"/lib/monaco-editor/min/vs/editor/editor.main.nls.zh-tw.js",
"/lib/monaco-editor/min/vs/language/css/cssMode.js",
"/lib/monaco-editor/min/vs/language/css/cssWorker.js",
"/lib/monaco-editor/min/vs/language/html/htmlMode.js",
"/lib/monaco-editor/min/vs/language/html/htmlWorker.js",
"/lib/monaco-editor/min/vs/language/json/jsonMode.js",
"/lib/monaco-editor/min/vs/language/json/jsonWorker.js",
"/lib/monaco-editor/min/vs/language/typescript/tsMode.js",
"/lib/monaco-editor/min/vs/language/typescript/tsWorker.js",
"/lib/monaco-editor/min/vs/loader.js",
"/ServiceWorkerRegister.js",
"/manifest.json"
];
// * listen for the install event and pre-cache anything in filesToCache * //
self.addEventListener(swInstallEvent, event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(requiredFiles);
            })
    );
});
self.addEventListener(swActivateEvent, function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (staticCacheName !== cacheName && cacheName.startsWith(staticCachePrefix)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener(networkFetchEvent, event => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === baseURL) {
            event.respondWith(caches.match(indexURL));
            return;
        }
    }
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (response.ok) {
                            if (requestUrl.origin === location.origin) {
                                caches.open(staticCacheName).then(cache => {
                                    cache.put(event.request.url, response);
                                });
                            }
                        }
                        return response.clone();
                    });
            }).catch(error => {
                console.error(error);
            })
    );
});
