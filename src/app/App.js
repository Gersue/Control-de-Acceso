import React, { Component } from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            titulo:'',
            descripcion: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.AddTask = this.AddTask.bind(this);
    }

    AddTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }

            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html:'Tarea Actualizada'});
                this.setState({titulo: '', descripcion: '', _id: ''});
                this.fetchTasks();
            });
        }else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then (data => {
                    console.log(data)
                    M.toast({html: 'Tarea Guardada con exito'});
                    this.setState({ titulo:'', descripcion:''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }

        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then (res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }


    deleteTask(id) {
        if (confirm('Estas Seguro que desea eliminar esto?')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': ' application/json'
                }
            })
            .then(res => res.json())
            .then (data => {
                console.log(data);
                M.toast({html: 'Tarea Eliminada'});
                this.fetchTasks();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then (data => {
                console.log(data)
                this.setState({
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    _id: data._id
                })
            })
    }

    handleChange(e) {
        const{name, value} = e.target;
        this.setState({
            [name]: value
        });
    }


    render() {
        return(
            <div>
                {/* Navegación */}
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>MERN STACK</a>
                    </div>
                </nav>

                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.AddTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='titulo' onChange={this.handleChange} type='text' placeholder='Tasks Title' value={this.state.titulo}/>
                                            </div>
                                            <div className='input-field col s12'>
                                                <textarea name='descripcion' onChange={this.handleChange} placeholder='Tasks Description' className='materialize-textarea' value={this.state.descripcion}></textarea>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn light-blue darken-4'>
                                            Send
                                        </button>
                                    </form>
                                </div>                                
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>TITULO</th>
                                        <th>DESCRIPCION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(tasks => {
                                            return (
                                                <tr key={tasks._id}>
                                                   <td>{tasks.titulo}</td> 
                                                   <td>{tasks.descripcion}</td>
                                                   <td>
                                                       <button onClick={() => this.deleteTask(tasks._id)} className='btn light-blue darken-4' style={{margin: '4px'}}>
                                                       <i className='material-icons'>clear</i>
                                                       </button>
                                                       <button onClick={() =>this.editTask(tasks._id)} className='btn light-blue darken-4' style={{margin: '4px'}}>
                                                           <i className='material-icons'>edit</i>
                                                        </button>
                                                   </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;