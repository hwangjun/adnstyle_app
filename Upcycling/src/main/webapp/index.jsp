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
		$( "#push" ).on( "click", function( event ) {
			push();
			});
		$( "#logout" ).on( "click", function( event ) {
			logout();
			});
		$( "#jo3in" ).on( "click", function( event ) {
			join();
			});
		
		function login(){
			var data = {
				    userId: "mihee1",
				    password: "11333112312312312111111223112234"
				};
			$.ajax({
				   url:"/loginAction.do",
				   type:"POST",
				   //data: { json: "John", location: "Boston" },
				   data: data,
				   success:function(response){
				         console.log(response)
				   },
				   error: function() {
				        console.log('errors');
				   }	
				});
		}
		function logout(){
			var data = {
				    userId: "mihee",
				    password: "1234"
				};
			$.ajax({
				   url:"/logoutAction.do",
				   type:"POST",
				   //data: { json: "John", location: "Boston" },
				   data: data,
				   success:function(response){
				         console.log(response)
				   },
				   error: function() {
				        console.log('errors');
				   }	
				});
		}
		function push(){
			var data = {
				    json: "Push",
				    bar: "barValue",
				    baz: "bazValue"
				};
			$.ajax({
				   url:"/pushAction.do",
				   type:"POST",
				   //data: { json: "John", location: "Boston" },
				   data: data,
				   success:function(response){
				         console.log(response)
				   },
				   error: function() {
				        console.log('errors');
				   }	
				});
		}
		function join(){
			var data = {
				    userId: "abcqwe",
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
		<button id="push">push test</button>
		<button id="logout">logout test</button>
		<button id="join">join test</button>
	</body>

</html>
