"use strict";
exports.__esModule = true;
var crawler_1 = require("./crawler");
var hot_search_1 = require("./parser/hot-search");
var path_1 = require("path");
var outputPath = path_1["default"].resolve(__dirname, '../output/hot-search.json');
var hsParser = hot_search_1["default"].getInstance(outputPath);
var crawler = new crawler_1["default"](hsParser);
crawler.parseData();
