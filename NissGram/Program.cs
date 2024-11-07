using Microsoft.EntityFrameworkCore;
using NissGram.DAL;
using Microsoft.AspNetCore.Identity;
using Serilog;
using Serilog.Events;
using NissGram.Models;
//Oppretter en instans av WebApplicationBuilder som brukes til å konfigurere
//applikasjonen. args er komamandolinje argumenter som sendes inn i applikasjonen
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("NissDbContextConnection") ?? throw new InvalidOperationException("Connection string 'NissDbContextConnection' not found.");
//Builder.Services: Refererer til IServiceCollection, som er en samling av tjenester 
//som applikasjonen bruker
//AddControllersWithViews: Legger støtte for MVC i applikasjonen. Denne metoden
//konfigurerer nødvendige tjenester for å håndtere kontroller og generere HTML-sider
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<NissDbContext>(options =>
{
    options.UseSqlite(
        builder.Configuration["ConnectionStrings:NissDbContextConnection"]);
});

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<NissDbContext>()
    .AddDefaultTokenProviders();
// builder.Services.AddDefaultIdentity<IdentityUser>().AddEntityFrameworkStores<NissDbContext>();

builder.Services.AddScoped<IPostRepository, PostRepository>();

builder.Services.AddRazorPages(); //Order of adding services does not matter
builder.Services.AddSession();

var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information() // levels: Trace< Information < Warning < Erorr < Fatal
    .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");


loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
                            e.Level == LogEventLevel.Information &&
                            e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

//Når alle tjenester og middleware er konfigurert, bygges applikasjonen ved å kalle Build()
//Dette returnerer en WebApplication instans som kan brukes til å konfigurere
//pipeline-en videre og kjøre applikasjonen
var app = builder.Build();

//Dette skjekker om applikasjonen kjører i et utviklingsmiljø.
if (app.Environment.IsDevelopment())
{
    //Hvis applikasjonen kjører i utviklingsmiljø, legger dette til en side som viser detaljerte feilmeldinger.
    app.UseDeveloperExceptionPage();
    //Calls the seeding method to initialise the database with predefined data.
    DBInit.Seed(app);
}

//Gjør det mulig at applikasjonen kan servere statiske filer som bilder direkte fra
//mappen wwwroot uten noen ekstra kode
app.UseStaticFiles();
app.UseSession();
//It checks incoming requests for authentication credentials and establishes the user's identity for the app
app.UseAuthentication();
app.UseAuthorization();

//Setter opp en standardrute for MVC-applikasjonen
app.MapDefaultControllerRoute();
app.MapRazorPages();

app.Run();
