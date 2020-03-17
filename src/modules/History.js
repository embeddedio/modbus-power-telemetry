import React from 'react';
import Flatpickr from 'react-flatpickr'
import * as Services from './Services';


export default class History extends React.Component {

    constructor() {
        super();
     
        this.state = {
          dateFrom: new Date(new Date().setHours(new Date().getHours() - 12)),
          dateTo: new Date(),
          FlatpickrOptions:{
            time_24hr:true
          },
          data:[]
        };
    };
    componentDidMount() {
        this.getData()
    };
    async getData(){
        let response = await Services.getHistory({from:this.state.dateFrom,to:this.state.dateTo})
        this.setState({data:response.data})      
    }
    render() {
        let {dateFrom,dateTo,FlatpickrOptions,data} = this.state;
        console.log(data)
        return (
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header ">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                            <i className="mdi mdi-file-document-box"></i>
                            </span> History </h3>
                        
                    </div>
                    
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Filter</h4>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">From</span>
                                            </div>
                                            <Flatpickr data-disable-time 
                                            options={FlatpickrOptions}
                                            value={dateFrom}
                                            onChange={dateFrom => { this.setState({dateFrom}) }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">To</span>
                                            </div>
                                            <Flatpickr data-disable-time 
                                            options={FlatpickrOptions}
                                            value={dateTo}
                                            onChange={dateTo => { this.setState({dateTo}) }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 text-center">                            
                                    <button type="button" onClick={this.getData.bind(this)} className="btn btn-gradient-primary btn-rounded btn-icon">
                                        <i className="mdi mdi-magnify"></i>
                                    </button>
                                </div>      
                            </div>             
                        </div>
                        </div>
                    </div>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Recent Tickets</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th> Date </th>
                                                <th> Time </th>
                                                <th> Voltage V1</th>
                                                <th> Voltage V2 </th>
                                                <th> Voltage V3 </th>
                                                <th> Current I1 </th>
                                                <th> Current I2 </th>
                                                <th> Current I3 </th>
                                                <th> Active Power 1</th>
                                                <th> Active Power 2</th>
                                                <th> Active Power 3</th>
                                                <th> Reactive Power 1</th>
                                                <th> Reactive Power 2</th>
                                                <th> Reactive Power 3</th>
                                                <th> Apparent Power 1</th>
                                                <th> Apparent Power 2</th>
                                                <th> Apparent Power 3</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data.map(( item, index ) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.date_at}</td>
                                                        <td>{item.time_at}</td>
                                                        <td>{item.v1}</td>
                                                        <td>{item.v2}</td>
                                                        <td>{item.v3}</td>
                                                        <td>{item.i1}</td>
                                                        <td>{item.i2}</td>
                                                        <td>{item.i3}</td>
                                                        <td>{item.p1}</td>
                                                        <td>{item.p2}</td>
                                                        <td>{item.p3}</td>
                                                        <td>{item.q1}</td>
                                                        <td>{item.q2}</td>
                                                        <td>{item.q3}</td>
                                                        <td>{item.s1}</td>
                                                        <td>{item.s2}</td>
                                                        <td>{item.s3}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
                <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2017 <a href="https://www.bootstrapdash.com/" rel="noreferrer">BootstrapDash</a>. All rights reserved.</span>
                        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
                    </div>
                </footer>
            </div>
        
        );
    }
}

