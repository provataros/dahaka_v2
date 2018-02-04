import { Meteor } from 'meteor/meteor';

import oracledb from "oracledb";

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  oracle : function(){

      const util = require('util')

      oracledb.fetchAsString = [ oracledb.DATE, oracledb.NUMBER ];

      var queries = {
          PASS : {
              RAW : "select AGENCY_ID, count(1) AS CNT,SUM(PASS_SALE_PRC) as AMT from TBABD171 where TRNSCTN_DATE LIKE '20171115%' GROUP BY AGENCY_ID order by agency_id asc",
              REPORT : "select AGENCY_ID, SUM(PASS_RELOAD_CNT+PASS_RELOAD_CANCEL_CNT) AS CNT, SUM(PASS_RELOAD_AMT+PASS_RELOAD_CANCEL_AMT) AS AMT from TBABS701 where RELOAD_DT LIKE '20171115%'  GROUP BY AGENCY_ID order by agency_id asc"        
          }
      }

      var results = {
          "001" : {
              RAW : null,
              REPORT : null
          },
          "003" : {
              RAW : null,
              REPORT : null
          },
          "002" : {
              RAW : null,
              REPORT : null
          },
          "004" : {
              RAW : null,
              REPORT : null
          },
      }

      var total = 0;


      function execute(settings){
          
          var cnt = 0;
          console.log("Executing for "+settings.connectString)
          oracledb.getConnection(settings,
              function(err, connection){
                  if (err) {
                      console.error(err.message);
                      return;
                  }
                  connection.execute(
                      queries.PASS.RAW,  // bind value for :id
                      function(err, result){
                          if (err) {
                              console.error(err.message);
                              cnt++;
                              doRelease(connection);
                              return;
                          }
                          //console.log(result.rows);
                          results[settings.agency].RAW = result.rows;
                          cnt++;
                          doRelease(connection);
                      }
                  );
                  connection.execute(
                      queries.PASS.REPORT,  // bind value for :id
                      function(err, result){
                          if (err) {
                              console.error(err.message);
                              cnt++;
                              doRelease(connection);
                              return;
                          }
                          //console.log(result.rows);
                          results[settings.agency].REPORT = result.rows;
                          cnt++;
                          doRelease(connection);
                      }
                  );
              }
          );

          function doRelease(connection){
              total++;
              if (cnt==2)
              connection.close(
                  function(err) {
                  if (err)console.error(err.message);
              });
              if (total==16){
                  //console.log(util.inspect(results, false, null));
                  compare(results);
              }
          }

      }


      function compare(data){
          var OASA = data["001"];
          var OSY = data["003"];
          var STASY = data["002"];
          var TRAINOSE = data["004"];

          console.log(util.inspect(data,false,null));

          console.log("OASA OP - OASA RP");
          console.log("Pass ----------")
          try{
              console.log("Count for OASA => (" + OASA.RAW[0][1] + " == " +OASA.REPORT[0][1] + ") " +(OASA.RAW[0][1] == OASA.REPORT[0][1]?"OK":"DIFFERENT"));
              console.log("Count for OASA => (" + OASA.RAW[0][2] + " == " +OASA.REPORT[0][2] + ") " +(OASA.RAW[0][2] == OASA.REPORT[0][2]?"OK":"DIFFERENT"));

              console.log("Count for STASY => (" + OASA.RAW[1][1] + " == " +OASA.REPORT[1][1] + ") " +(OASA.RAW[1][1] == OASA.REPORT[1][1]?"OK":"DIFFERENT"));
              console.log("Count for STASY => (" + OASA.RAW[1][2] + " == " +OASA.REPORT[1][2] + ") " +(OASA.RAW[1][2] == OASA.REPORT[1][2]?"OK":"DIFFERENT"));

              console.log("Count for OSY => (" + OASA.RAW[2][1] + " == " +OASA.REPORT[2][1] + ") " +(OASA.RAW[2][1] == OASA.REPORT[2][1]?"OK":"DIFFERENT"));
              console.log("Count for OSY => (" + OASA.RAW[2][2] + " == " +OASA.REPORT[2][2] + ") " +(OASA.RAW[2][2] == OASA.REPORT[2][2]?"OK":"DIFFERENT"));
          }    
          catch(e){
              console.log("Error");
              //console.log(e);
          }    
          
          console.log("STASY OP - STASY RP");
          console.log("Pass ----------")
          try{
              console.log("Count for STASY => (" + STASY.RAW[0][1] + " == " +STASY.REPORT[0][1] + ") " +(STASY.RAW[0][1] == STASY.REPORT[0][1]?"OK":"DIFFERENT"));
              console.log("Count for STASY => (" + STASY.RAW[0][2] + " == " +STASY.REPORT[0][2] + ") " +(STASY.RAW[0][2] == STASY.REPORT[0][2]?"OK":"DIFFERENT"));
          }    
          catch(e){
              console.log("Error");
              //console.log(e);
          }    
          
          console.log("OSY OP - OSY RP");
          console.log("Pass ----------")
          try{
              console.log("Count for STASY => (" + OSY.RAW[0][1] + " == " +OSY.REPORT[0][1] + ") " +(OSY.RAW[0][1] == OSY.REPORT[0][1]?"OK":"DIFFERENT"));
              console.log("Count for STASY => (" + OSY.RAW[0][2] + " == " +OSY.REPORT[0][2] + ") " +(OSY.RAW[0][2] == OSY.REPORT[0][2]?"OK":"DIFFERENT"));
          }
          catch(e){
              console.log("Error");
              //console.log(e);
          }    
          
          console.log("TRAINOSE OP - TRAINOSE RP");
          console.log("Pass ----------")
          try{
              console.log("Count for STASY => (" + TRAINOSE.RAW[0][1] + " == " +TRAINOSE.REPORT[0][1] + ") " +(TRAINOSE.RAW[0][1] == TRAINOSE.REPORT[0][1]?"OK":"DIFFERENT"));
              console.log("Count for STASY => (" + TRAINOSE.RAW[0][2] + " == " +TRAINOSE.REPORT[0][2] + ") " +(TRAINOSE.RAW[0][2] == TRAINOSE.REPORT[0][2]?"OK":"DIFFERENT"));
          }
          catch(e){
              console.log("Error for");
              //console.log(e);
          }    

          
          
          console.log("TRAINOSE OP - TRAINOSE RP");
          console.log("Pass ----------")
          try{
              console.log("Count for STASY => (" + TRAINOSE.RAW[0][1] + " == " +TRAINOSE.REPORT[0][1] + ") " +(TRAINOSE.RAW[0][1] == TRAINOSE.REPORT[0][1]?"OK":"DIFFERENT"));
              console.log("Count for STASY => (" + TRAINOSE.RAW[0][2] + " == " +TRAINOSE.REPORT[0][2] + ") " +(TRAINOSE.RAW[0][2] == TRAINOSE.REPORT[0][2]?"OK":"DIFFERENT"));
          }
          catch(e){
              console.log("Error for");
              //console.log(e);
          }    
          
      }

      execute({
          agency        : "001",//OASA
          user          : "mcdev",
          password      : "mcdev!6102",
          connectString : "MCOPDB"
      });
      execute({
          agency        : "001",//OASA
          user          : "mrrpt",
          password      : "tprrm6102",
          connectString : "MCRPDB"
      });


      execute({
          agency        : "002", //STASY
          user          : "sadev",
          password      : "sadev!6102",
          connectString : "SAOPDB"
      });
      execute({
          agency        : "002", //STASY
          user          : "srrpt",
          password      : "tprrs6102",
          connectString : "SARPDB"
      });
      execute({
          agency        : "003", //OSY
          user          : "oadev",
          password      : "oadev!6102",
          connectString : "OAOPDB"
      });
      execute({
          agency        : "003", //OSY
          user          : "orrpt",
          password      : "tprro6102",
          connectString : "OARPDB"
      });

      execute({
          agency        : "004", //TRAINOSE
          user          : "tadev",
          password      : "tadev!6102",
          connectString : "TAOPDB"
      });
      execute({
          agency        : "004", //TRAINOSE
          user          : "trdev",
          password      : "trdev!6102",
          connectString : "TARPDB"
      });
  }
})