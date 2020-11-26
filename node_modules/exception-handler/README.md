# exception-handler
A Class for exception treatment for JS

## Usage

- Define a class for Specific error:

	```javascript
	class MyError extends Exception{
		construct(error, cause){
			super(error, cause)
		}
	}
	```

- Copy Parent Exception's error treatment function to specific one:

	```javascript
	class MyError extends Exception{
		construct(error, cause){
			super(error, cause)
			this.my_error = this.allways
		}
	}
	```

- Catch it when ocurrs in your code:

	```javascript
	try{
		doStuff()
	}catch(error){
		error.catch("my_error", function(error) {
			console.error("This is my error")
		})
		.catch("other", function(error) {
			console.error("Just another error")
		})
	}
	function doStuff(){
		throw new MyError("This is it")
	}
	```

	* Only first catch will be executed
