# Bruk et offisielt .NET SDK-bilde som en build-stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopier prosjektfilen og gjenopprett avhengigheter
COPY NissGram/*.csproj ./NissGram/
WORKDIR /src/NissGram
RUN dotnet restore

# Kopier resten av filene og bygg applikasjonen
COPY NissGram/. .
RUN dotnet publish -c Release -o /app/out

# Bruk et offisielt .NET-runtime-bilde som en runtime-stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Eksponer porten som applikasjonen kjører på
EXPOSE 8080

# Angi oppstartskommandoen
ENTRYPOINT ["dotnet", "NissGram.dll"]