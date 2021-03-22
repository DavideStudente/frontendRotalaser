

export function refreshToken(refreshToken) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshtoken: sessionStorage.getItem('refreshtoken') })
      };
    fetch('https://localhost:5002/v1/refresh', requestOptions)
          .then(response => {
            if (response.status==401) {
              alert("sessione scaduta, ritorno al login!")
              sessionStorage.removeItem('refreshtoken');
              sessionStorage.removeItem('token');
              //this.props.history.push({pathname:'/'});
              window.location.replace("http://localhost:3000/");
              return "false";
            }
            else {
                return response.json()
            }
          })
            .then(data => {
            if (data=="false") {
              return;
            }
            //sessionStorage.setItem('refreshtoken', data.refreshtoken)
            console.log("questo è il nuovo token!" + data);
            sessionStorage.setItem('token', data )
            //console.log(sessionStorage.getItem('refreshtoken'))
            //this.props.history.push({pathname:'/users/'+ this.state.username +'/factories', state: data.token})});
            return data
          });
  }