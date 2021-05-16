"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.get("login", "AuthController.login");
  Route.get("auto", "AuthController.auto_authenticate");
}).as("Auth");

Route.group(() => {
  Route.post("bp", "BpController.create");
  Route.post("uber", "UberController.create");
  Route.post("bolt", "BoltController.create");
  Route.post("prio", "PrioController.create");
  Route.post("freenow", "FreeNowController.create");
  Route.post("viaverde", "ViaVerdeController.create");
  Route.post("bolt/lucros", "BoltGanhoController.create");
  Route.get("freenow", "GetDataController.store");
  Route.get("bolt", "BoltController.index");
  Route.get("bolt/driver/", "BoltController.search");
  Route.get("bolt/driver/all", "BoltController.searchList");
  Route.get("bolt/lucros/:key", "BoltGanhoController.index");
  Route.get("bolt/driver/lucros", "BoltGanhoController.search");
  Route.get("reset", "BotController.index");
})
  .as("Bots")
  .prefix("bot");

Route.group(() => {
  Route.get("data", "GetDataController.index");
})
  .as("Motoristas")
  .prefix("api/v1");

Route.group(() => {
  // Route.get("admin", "GetDataController.admin");
  Route.get("ubers", "GetDataController.show");
  Route.get("freenow", "GetDataController.showFreeNow");
})
  .as("Admin")
  .prefix("admin/v1");
Route.group(() => {
  Route.post("search", "SearchController.index");
})
  .as("Public")
  .prefix("public/v1");

Route.group(() => {
  Route.get("me", "BotsAuthController.index");
  Route.post("new", "BotController.create");
})
  .prefix("api/bot/v1")
  .as("Internal Bots");
