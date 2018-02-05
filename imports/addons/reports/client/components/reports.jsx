import React from 'react';

import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

var styles = {
    flex : {
      display : "flex",
      flexFlow : "row",
      justifyContent : "space-evenly",
      width : "500px",
      margin : "0px auto",
    },
    flexError : {
      display : "flex",
      flexFlow : "row",
      justifyContent : "space-evenly",
      width : "500px",
      margin : "0px auto",
      color : "red",
    }
}

export default class Report extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            OASA : {
                OASA : {
                    OP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    },
                    RP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    }
                },
                OSY : {
                    OP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    },
                    RP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    }
                },
                STASY : {
                    OP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    },
                    RP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    }
                },
                TRAINOSE : {
                    OP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    },
                    RP : {                        
                        OP : {
                            pass : 0,
                            valid : 0
                        },
                        RP : {
                            pass : 0,
                            valid : 0
                        }
                    }
                },
            },
            OSY : {
                OP : {
                    pass : 0,
                    valid : 0
                },
                RP : {
                    pass : 0,
                    valid : 0
                }
            },
            STASY : {
                OP : {
                    pass : 0,
                    valid : 0
                },
                RP : {
                    pass : 0,
                    valid : 0
                }
            },
            TRAINOSE : {
                OP : {
                    pass : 0,
                    valid : 0
                },
                RP : {
                    pass : 0,
                    valid : 0
                }
            },
        }
        var that = this;
        Meteor.call("getOASAMCData",null,function(e,l){
            if (e){
                console.log(e);
                return;
            }
            console.log(r);
            var r = l.OP;
            var OP = r[0].rows;
            var RP = r[1].rows;
            var OASA = { OASA : { OP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }, RP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } } }, OSY : { OP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }, RP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } } }, STASY : { OP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }, RP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } } }, TRAINOSE : { OP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }, RP : { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } } }, }
            for (var i=0;i<OP.length;i++){
                if (OP[i][0]=="001"){
                    OASA.OASA.OP.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="002"){
                    OASA.STASY.OP.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="003"){
                    OASA.OSY.OP.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="004"){
                    OASA.TRAINOSE.OP.OP.pass = OP[i][2];
                }
            }
            for (var i=0;i<RP.length;i++){
                if (RP[i][0]=="001"){
                    OASA.OASA.OP.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="002"){
                    OASA.STASY.OP.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="003"){
                    OASA.OSY.OP.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="004"){
                    OASA.TRAINOSE.OP.RP.pass = RP[i][2];
                }
            }
            var r = l.RP;
            var OP = r[0].rows;
            var RP = r[1].rows;
            for (var i=0;i<OP.length;i++){
                if (OP[i][0]=="001"){
                    OASA.OASA.RP.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="002"){
                    OASA.STASY.RP.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="003"){
                    OASA.OSY.RP.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="004"){
                    OASA.TRAINOSE.RP.OP.pass = OP[i][2];
                }
            }
            for (var i=0;i<RP.length;i++){
                if (RP[i][0]=="001"){
                    OASA.OASA.RP.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="002"){
                    OASA.STASY.RP.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="003"){
                    OASA.OSY.RP.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="004"){
                    OASA.TRAINOSE.RP.RP.pass = RP[i][2];
                }
            }
            that.setState({OASA : OASA});
        })

        
        Meteor.call("getSTASYMCData",null,function(e,r){
            if (e){
                console.log(e);
                return;
            }
            var OP = r[0].rows;
            var RP = r[1].rows;
            var OASA = { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }

            for (var i=0;i<OP.length;i++){
                if (OP[i][0]=="001"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="002"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="003"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="004"){
                    OASA.OP.pass = OP[i][2];
                }
            }
            for (var i=0;i<RP.length;i++){
                if (RP[i][0]=="001"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="002"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="003"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="004"){
                    OASA.RP.pass = RP[i][2];
                }
            }
            that.setState({STASY : OASA});
        })
        Meteor.call("getOSYMCData",null,function(e,r){
            if (e){
                console.log(e);
                return;
            }
            var OP = r[0].rows;
            var RP = r[1].rows;
            var OASA = { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }

            for (var i=0;i<OP.length;i++){
                if (OP[i][0]=="001"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="002"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="003"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="004"){
                    OASA.OP.pass = OP[i][2];
                }
            }
            for (var i=0;i<RP.length;i++){
                if (RP[i][0]=="001"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="002"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="003"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="004"){
                    OASA.RP.pass = RP[i][2];
                }
            }
            that.setState({OSY : OASA});
        })
        Meteor.call("getTRAINOSEMCData",null,function(e,r){
            if (e){
                console.log(e);
                return;
            }
            var OP = r[0].rows;
            var RP = r[1].rows;
            var OASA = { OP : { pass : 0, valid : 0 }, RP : { pass : 0, valid : 0 } }

            for (var i=0;i<OP.length;i++){
                if (OP[i][0]=="001"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="002"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="003"){
                    OASA.OP.pass = OP[i][2];
                }
                else if (OP[i][0]=="004"){
                    OASA.OP.pass = OP[i][2];
                }
            }
            for (var i=0;i<RP.length;i++){
                if (RP[i][0]=="001"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="002"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="003"){
                    OASA.RP.pass = RP[i][2];
                }
                else if (RP[i][0]=="004"){
                    OASA.RP.pass = RP[i][2];
                }
            }
            console.log(r);
            that.setState({TRAINOSE : OASA});
        })
    }
    render() {
        console.log(this.state);
        return (
        <div style={{textAlign : "center"}}>
            <h1 style={{margin : "5px auto"}}>OASA</h1>
            <div style={styles.flex}>
                <div>
                    <h2>Operation</h2>
                </div>
                <div></div>
                <div>
                    <h2>Report</h2>
                </div>
            </div>
            <div style={styles.flex}>
                <div>
                    {this.state.OASA.OASA.OP.OP.pass} / {this.state.OASA.OASA.OP.RP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.OASA.OASA.RP.OP.pass} / {this.state.OASA.OASA.RP.RP.pass}
                </div>
            </div>
            <div style={styles.flex}>
                <div>
                    {this.state.OASA.STASY.OP.OP.pass} / {this.state.OASA.STASY.OP.RP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.OASA.STASY.RP.OP.pass} / {this.state.OASA.STASY.RP.RP.pass}
                </div>
            </div>
            <div style={styles.flex}>
                <div>
                    {this.state.OASA.OSY.OP.OP.pass} / {this.state.OASA.OSY.OP.RP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.OASA.OSY.RP.OP.pass} / {this.state.OASA.OSY.RP.RP.pass}
                </div>
            </div>
                <div style={styles.flex}>
                <div>
                    {this.state.OASA.TRAINOSE.OP.OP.pass} / {this.state.OASA.TRAINOSE.OP.RP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.OASA.TRAINOSE.RP.OP.pass} / {this.state.OASA.TRAINOSE.RP.RP.pass}
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>

            <h1 style={{margin : "5px auto"}}>STASY</h1>
            <div style={styles.flex}>
                <div>
                    <h2>Operation</h2>
                </div>
                <div></div>
                <div>
                    <h2>Report</h2>
                </div>
            </div>
            <div style={styles.flex}>
                <div>
                    {this.state.STASY.OP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.STASY.RP.pass}
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>


            <h1 style={{margin : "5px auto"}}>OSY</h1>
            <div style={styles.flex}>
                <div>
                    <h2>Operation</h2>
                </div>
                <div></div>
                <div>
                    <h2>Report</h2>
                </div>
            </div>
            <div style={styles.flex}>
                <div>
                    {this.state.OSY.OP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.OSY.RP.pass}
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>

            <h1 style={{margin : "5px auto"}}>TRAINOSE</h1>
            <div style={styles.flex}>
                <div>
                    <h2>Operation</h2>
                </div>
                <div></div>
                <div>
                    <h2>Report</h2>
                </div>
            </div>
            <div style={styles.flex}>
                <div>
                    {this.state.TRAINOSE.OP.pass}
                </div>
                <div>
                    <b>Pass Topup</b>
                </div>
                <div>
                    {this.state.TRAINOSE.RP.pass}
                </div>
            </div>
        </div>
        );
    }
}