import React from 'react';
import MixedChart from './charts/chart';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data:{top:{sumI:0,sumP:0,sumQ:0,sumS:0}}
        }
        this.handleChange = this.handleChange.bind(this)
       
    }
    handleChange(value){
        this.setState({data:value})
    } 

    render() {

        return (   
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi  mdi-chart-bar"></i>
                        </span> Dashboard </h3>
                 
                </div>
                <div className="row">
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body text-center">
                                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="1circle" />
                                <h4 className="font-weight-normal mb-3"><b>Total Current</b></h4>
                                <h2 className="mb-5">{this.state.data.top.sumI}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-info card-img-holder text-white">
                            <div className="card-body text-center">
                                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image2" />
                                <h4 className="font-weight-normal mb-3"><b>Total Active Energy </b></h4>
                                <h2 className="mb-5">{this.state.data.top.sumP}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-success card-img-holder text-white">
                            <div className="card-body text-center">
                                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image3" />
                                <h4 className="font-weight-normal mb-3"><b>Total Reactive Energy</b> </h4>
                                <h2 className="mb-5">{this.state.data.top.sumQ}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-success card-img-holder text-white">
                            <div className="card-body text-center">
                                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image4" />
                                <h4 className="font-weight-normal mb-3"><b>Total Apparent Energy</b></h4>
                                <h2 className="mb-5">{this.state.data.top.sumS}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body chart-padding-new">                            
                                <MixedChart onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>          
                </div>
              
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Recent Data</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                    <thead>
                                            <tr>
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
                                            {this.state.data.history && this.state.data.history.map(( item, index ) => {
                                                return (
                                                    <tr key={index}>
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
                
            </div>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2017 <a href="https://www.bootstrapdash.com/" rel="noreferrer">BootstrapDash</a>. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
                </div>
            </footer>
        </div>
    
    )};
}

