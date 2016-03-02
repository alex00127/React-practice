import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
	    notes: [
	  	  {
		  		id:uuid.v4(),
		  		task: 'Learn Webpack'
	  	  },
	  	  {
		  		id:uuid.v4(),
		  		task: 'Learn React'
	  	  },
	  	  {
		  		id:uuid.v4(),
		  		task: 'Do larudry'
	  	  }
	  	]
		};
	}
  render() {
  	const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>

        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>

    );
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  };

  editNote = (id, task) => {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
  };
  
}