#pragma checksum "C:\Users\Santiago.rodriguez\source\repos\WebApi\WebApi\Views\Usuarios\Edit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b41ba3e5ec7ee42fbdac06daf04083a37952707d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Usuarios_Edit), @"mvc.1.0.view", @"/Views/Usuarios/Edit.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b41ba3e5ec7ee42fbdac06daf04083a37952707d", @"/Views/Usuarios/Edit.cshtml")]
    public class Views_Usuarios_Edit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<WebApi.Models.Usuarios>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\Users\Santiago.rodriguez\source\repos\WebApi\WebApi\Views\Usuarios\Edit.cshtml"
  
    ViewData["Title"] = "Edit";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<h1>Edit</h1>

<h4>Usuarios</h4>
<hr />
<div class=""row"">
    <div class=""col-md-4"">
        <form asp-action=""Edit"">
            <div asp-validation-summary=""ModelOnly"" class=""text-danger""></div>
            <input type=""hidden"" asp-for=""idUsuario"" />
            <div class=""form-group"">
                <label asp-for=""NombreUsuario"" class=""control-label""></label>
                <input asp-for=""NombreUsuario"" class=""form-control"" />
                <span asp-validation-for=""NombreUsuario"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Clave"" class=""control-label""></label>
                <input asp-for=""Clave"" class=""form-control"" />
                <span asp-validation-for=""Clave"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <input type=""submit"" value=""Save"" class=""btn btn-primary"" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-a");
            WriteLiteral("ction=\"Index\">Back to List</a>\r\n</div>\r\n\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n");
#nullable restore
#line 38 "C:\Users\Santiago.rodriguez\source\repos\WebApi\WebApi\Views\Usuarios\Edit.cshtml"
      await Html.RenderPartialAsync("_ValidationScriptsPartial");

#line default
#line hidden
#nullable disable
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<WebApi.Models.Usuarios> Html { get; private set; }
    }
}
#pragma warning restore 1591