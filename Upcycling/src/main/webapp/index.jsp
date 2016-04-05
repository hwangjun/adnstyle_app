<html>
<head>
</head>
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$( "#login" ).on( "click", function( event ) {
			login();
			});
		$( "#getToken" ).on( "click", function( event ) {
			getToken();
			});
		$( "#list" ).on( "click", function( event ) {
			list();
			});
		$( "#register" ).on( "click", function( event ) {
			register();
			});
		$( "#join" ).on( "click", function( event ) {
			join();
			});
		
		function login(){
			var data = {accessToken: "238f617bdde302ed413de7be018b0bf6b4a43ab8e622bb596df5dc763361e5f7"};
					$.ajax({
				   url:"/client/login",
				   data: data,
				   type:"POST",
				   success:function(response){console.log(response)},
				   error: function() {console.log('errors');}	
				});
		}
		function getToken(){
			$.ajax({
				   url:"/client/token",
				   type:"POST",
				   success:function(response){console.log(response)},
				   error: function() {console.log('errors');}	
				});
		}
		function list(){
			var data = {accessToken: "238f617bdde302ed413de7be018b0bf6b4a43ab8e622bb596df5dc763361e5f7"};
			$.ajax({
				   url:"/water/list",
				   type:"POST",
				   data: data,
				   success:function(response){console.log(response)},
				   error: function() {console.log('errors');}	
				});
		}
		function register(){
			var data = {accessToken: "238f617bdde302ed413de7be018b0bf6b4a43ab8e622bb596df5dc763361e5f7"};
			$.ajax({
				   url:"/water/register",
				   type:"POST",
				   data: data,
				   success:function(response){console.log(response)},
				   error: function() {console.log('errors');}	
				});
		}
		function join(){
			var data = {
				    userId: "mi2h355ee",
				    password: "1111"
				};
			$.ajax({
				   url:"/joinAction.do",
				   type:"POST",
				   data: data,
				   success:function(response){
				         console.log(response)
				   },
				   error: function() {
				        console.log('errors');
				   }	
				});
		}
	
	});
</script>

	<body>
		<button id="login">login test</button>
		<button id="getToken">getToken test</button>
		<button id="list">list test</button>
		<button id="register">register test</button>
		<button id="join">join test</button>
	</body>

</html>
