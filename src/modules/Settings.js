import React from 'react';
import * as Services from './Services';

export default class Settings extends React.Component {

    constructor() {
        super();
        
        this.optionChange       = this.optionChange.bind(this);
        this.changeHandler      = this.changeHandler.bind(this);
        this.saveSettings       = this.saveSettings.bind(this);
        this.getSettings        = this.getSettings.bind(this);
        this.getListSerialPort  = this.getListSerialPort.bind(this);

        this.state = { 
          serialPort:[], 
          settings:{
            usb:'',
            refresh:1,        
            modbusCodes:{
              powerType:'single',
              address:0,
              frequency:'',
              v1:'', v2:'', v3:'', i1:'', i2:'', i3:'', p1:'', p2:'', p3:'', 
              q1:'', q2:'', q3:'', s1:'', s2:'', s3:''
            }
          }
        };
    };

    componentDidMount() {      
      this.optionChange();
      this.getSettings();
      this.getListSerialPort();
    };
    componentDidUpdate(nextProps, prevState) {
        let option = this.props.match.params.option;
        if(prevState.urlOption && (prevState.urlOption !== option) && (nextProps.match.params.option === prevState.urlOption) ){
          this.optionChange()
        }
    }

    optionChange(){
      this.setState({urlOption:this.props.match.params.option}) 
    }

    changeHandler(event){
      let {name,value} = event.target;
      if(name==='refresh' || name==='usb'){
        let set = this.state.settings;
        set[name] = value;
        this.setState({settings:set});       
      }else{
        let modbusCodes = this.state.settings.modbusCodes;
          modbusCodes[name] = value;   
          this.setState({modbusCodes : modbusCodes });       
      }
      
    }

    async getSettings(){
      let response = await Services.getSettings();
      let settings = {'usb':response.usb,'refresh':response.refresh, 'modbusCodes': response.modbusCodes }
      this.setState({settings:settings});
    }
    async saveSettings(){
      let data = this.state.settings;
      Services.saveSettings(data);
      this.getSettings();
    }
    async getListSerialPort(){
      let response = await Services.getListSerialPort();
      this.setState({serialPort:response});
    }
    
    render() {
        let option = this.state.urlOption;
        let serialPort = this.state.serialPort;
        function modbuscode(that){
          return (            
            <div className="col-12">
              <div className="card">
                  <div className="card-body">
                      <h4 className="card-title">Device Information</h4>
                      <form className="form-sample">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-form-label new-label-width">Power Type</label>
                              <div className="new-input-width">
                                <select name="powerType" onChange={that.changeHandler} value={that.state.settings.modbusCodes.powerType} className="form-control new-border-input" style={{width:'150px'}}>
                                  <option value="single">Single Phase </option>
                                  <option value="three">Three Phase</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-form-label new-label-width">Device Address</label>
                              <div className="new-input-width" >
                                <input name="address" onChange={that.changeHandler} value={that.state.settings.modbusCodes.address} type="number" className="form-control new-border-input" />
                              </div>
                            </div>
                          </div>                          
                        </div>
                        <h4 className="card-title">Modbus Codes List</h4>
                          <div className="row">
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Voltage V1</label>
                                    <div className="new-input-width">
                                        <input name="v1" onChange={that.changeHandler} value={that.state.settings.modbusCodes.v1} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Voltage V2</label>
                                    <div className="new-input-width">
                                        <input name="v2" onChange={that.changeHandler} value={that.state.settings.modbusCodes.v2} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Voltage V3</label>
                                    <div className="new-input-width">
                                        <input name="v3" onChange={that.changeHandler} value={that.state.settings.modbusCodes.v3} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Current I1</label>
                                    <div className="new-input-width">
                                        <input name="i1" onChange={that.changeHandler} value={that.state.settings.modbusCodes.i1} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Current I2</label>
                                    <div className="new-input-width">
                                        <input name="i2" onChange={that.changeHandler} value={that.state.settings.modbusCodes.i2} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Current I3</label>
                                    <div className="new-input-width">
                                        <input name="i3" onChange={that.changeHandler} value={that.state.settings.modbusCodes.i3} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Active Power 1</label>
                                    <div className="new-input-width">
                                        <input name="p1" onChange={that.changeHandler} value={that.state.settings.modbusCodes.p1} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Active Power 2</label>
                                    <div className="new-input-width">
                                        <input name="p2" onChange={that.changeHandler} value={that.state.settings.modbusCodes.p2} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Active Power 3</label>
                                    <div className="new-input-width">
                                        <input name="p3" onChange={that.changeHandler} value={that.state.settings.modbusCodes.p3} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Reactive Power 1</label>
                                    <div className="new-input-width">
                                        <input name="q1" onChange={that.changeHandler} value={that.state.settings.modbusCodes.q1} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Reactive Power 2</label>
                                    <div className="new-input-width">
                                        <input name="q2" onChange={that.changeHandler} value={that.state.settings.modbusCodes.q2}  type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Reactive Power 3</label>
                                    <div className="new-input-width">
                                        <input name="q3" onChange={that.changeHandler} value={that.state.settings.modbusCodes.q3} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Apparent Power 1</label>
                                    <div className="new-input-width">
                                        <input name="s1" onChange={that.changeHandler} value={that.state.settings.modbusCodes.s1} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Apparent Power 2</label>
                                    <div className="new-input-width">
                                        <input name="s2" onChange={that.changeHandler} value={that.state.settings.modbusCodes.s2} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group row">
                                    <label className="col-form-label new-label-width">Apparent Power 3</label>
                                    <div className="new-input-width">
                                        <input name="s3" onChange={that.changeHandler} value={that.state.settings.modbusCodes.s3} type="text" className="form-control new-border-input" />
                                    </div>
                                </div>
                            </div>
                          </div>

                      </form>
                  </div>
                  <div style={{width:'100px',margin:'0 auto',paddingBottom:'30px'}} >
                    <button onClick={that.saveSettings} style={{padding:'20px'}} className="btn btn-block btn-lg btn-gradient-primary">SAVE</button>
                  </div>
              </div>
            </div>
          )
        }
        function generalSetting(that){
          return (
            <div className="col-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">General Settings</h4>
                  <form className="forms-sample">
                    <div className="form-group">
                      <label>USB Port</label>
                      <select className="form-control" name="usb" onChange={that.changeHandler} value={that.state.settings.usb}>
                      {serialPort.map(i => 
                        <option key={i} value={i} >{i}</option>
                      )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Refresh Time (min)</label>
                      <select className="form-control" name="refresh" onChange={that.changeHandler} value={that.state.settings.refresh}>
                        <option value="1" >1</option>
                        <option value="3" >3</option>
                        <option value="5" >5</option>
                        <option value="10" >10</option>
                        <option value="15" >15</option>
                        <option value="30" >30</option>
                        <option value="60" >60</option>
                        <option value="120" >120</option>
                        <option value="180" >180</option>
                      </select>
                    </div>                   
                  </form>
                  <div style={{margin:'0 auto',textAlign:'center'}} >
                      <button type="submit" onClick={that.saveSettings} className="btn btn-gradient-primary mr-2">SAVE</button>
                    </div>
                </div>
              </div>
            </div>
         )
        }
        return (
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header ">
                <h3 className="page-title">
                  <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-file-document-box"></i>
                  </span> Settings 
                </h3>
              </div>
              { option==='modbus'
                ? modbuscode(this)
                : generalSetting(this)
              }
            </div>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2017 <a href="https://www.bootstrapdash.com/" rel="noreferrer">BootstrapDash</a>. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
                </div>
            </footer>
          </div>
            
        )
    }
}