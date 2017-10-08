"use strict";
const StatsCalculator = require("./../../logic/stats-calculator");
const should = require("should");

describe("statsCalculator", function(){

    describe("calculateTopAuthors", function(){

        it("returns an array of authors with read counts, sorted by read count descending", function(){
            let input = require("./../data/test.json");
            //let input = require("./../../data/1993254.json");
            let output = StatsCalculator.calculateTopAuthors(input);
            output.should.be.an.Array();
            output[0].author.should.equal("Terry Pratchett");
            output[0].count.should.equal(3);
            output.length.should.equal(2);
        });

    });

    describe("getHighestRated", function(){

        it("returns an array of n books with their average ratings and the user's rating", function(){
            let input = require("./../data/test.json");
            //let input = require("./../../data/1993254.json");
            let output = StatsCalculator.getHighestRated(input, 10);
            output.should.be.an.Array();
            output[0].author.should.equal("Terry Pratchett");
            output[0].average_rating.should.equal(4.5);
            output.length.should.equal(4);
        });

    });

});
