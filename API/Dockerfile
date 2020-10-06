# FROM mcr.microsoft.com/dotnet/core/sdk:3.1

# WORKDIR /app

# COPY . ./

# RUN dotnet publish -c Release -o out TodoApi.sln

# ENTRYPOINT ["dotnet", "/app/out/TodoApi.Api.dll"]


FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY */*.csproj ./
RUN dotnet restore TodoApi.Api.csproj
COPY . .
RUN dotnet publish -c Release -o out TodoApi.sln

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out/ .
ENTRYPOINT ["dotnet", "TodoApi.Api.dll"]