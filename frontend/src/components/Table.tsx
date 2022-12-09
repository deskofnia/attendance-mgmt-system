import React from 'react'

export const Table = () => {
  return (
    <div className="table">
    
    <div className="row header blue">
      <div className="cell">
        Username
      </div>
      <div className="cell">
        Email
      </div>
      <div className="cell">
        Password
      </div>
      <div className="cell">
        Active
      </div>
    </div>
    
    <div className="row">
      <div className="cell" data-title="Username">
        ninjalug
      </div>
      <div className="cell" data-title="Email">
        misterninja@hotmail.com
      </div>
      <div className="cell" data-title="Password">
        ************
      </div>
      <div className="cell" data-title="Active">
        Yes
      </div>
    </div>
    
    <div className="row">
      <div className="cell" data-title="Username">
        jsmith41
      </div>
      <div className="cell" data-title="Email">
        joseph.smith@gmail.com
      </div>
      <div className="cell" data-title="Password">
        ************
      </div>
      <div className="cell" data-title="Active">
        No
      </div>
    </div>
    
    <div className="row">
      <div className="cell" data-title="Username">
        1337hax0r15
      </div>
      <div className="cell" data-title="Email">
        hackerdude1000@aol.com
      </div>
      <div className="cell" data-title="Password">
        ************
      </div>
      <div className="cell" data-title="Active">
        Yes
      </div>
    </div>
    
    <div className="row">
      <div className="cell" data-title="Username">
        hairyharry19
      </div>
      <div className="cell" data-title="Email">
        harryharry@gmail.com
      </div>
      <div className="cell" data-title="Password">
        ************
      </div>
      <div className="cell" data-title="Active">
        Yes
      </div>
    </div>
    
  </div>
  )
}
