 //資料陣列
        var branches = [];
		
		var query = firebase.database().ref("area").orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {   
				branches.push({
					area: childSnapshot.key,
					start: childSnapshot.val().start,
					end: childSnapshot.val().end,
					rank: 0
				});						
			});	
			branches.sort(function (a, b) {
				if (a.start > b.start) 
					return 1;
				else{
					return (a.end > b.end) ? 1 : -1;
				}
			});
			firebase.database().ref('/uid/'+firebase.auth().currentUser.uid).once('value').then(function(snap) {
				var went = snap.val().went;		var count=0;
				for(var i = 0;i<branches.length;i++){
					var b = branches[i];
					for(var j = b.start; j <b.end; j++){
						if(went[count]){
							b.rank ++;
						}
						count++;
					}
					console.log(b.area+":"+b.rank+"/"+(b.end-b.start));
				}
			});			
		});