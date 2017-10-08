"use strict";
const StatsCalculator = require("./../../logic/stats-calculator");
const should = require("should");

describe("statsCalculator", function(){

    describe("calculateTopAuthors", function(){

        it("returns an array of authors with read counts, sorted by read count descending", function(){
            let input = require("./../data/test.json");
            let output = StatsCalculator.calculateTopAuthors(input);
            output.should.be.an.Array();
            output[0].author.should.equal("Terry Pratchett");
            output[0].count.should.equal(3);
            output.length.should.equal(2);
        });

    });

});
