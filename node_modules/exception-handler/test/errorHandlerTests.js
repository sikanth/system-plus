var expect = require('chai').expect,
	Exception = require('../exception-handler')

describe ('Error Handling', function(){
	it('should create nested exceptions', function() {
		let inner = new Exception('Inner Exception');
		let outer = new Exception('Outer Exception', inner);

		expect(outer.cause).to.be.equals(inner);
	})

	it('should execute error functions for treatment', function() {
		class MyException extends Exception{
			constructor(message, cause){
				super(message, cause)
				this.my_error = this.always
			}
		}

		let err = new MyException("my error")

		let gotcha
		err.catch('my_error', function(e){
			gotcha = e
		})

		expect(gotcha).to.be.equals(err)
	})

	it('should execute error functions for treatment for "other"', function() {
		class MyException extends Exception{
			constructor(message, cause){
				super(message, cause)
				this.my_error = this.always
			}
		}

		let err = new MyException("my error")

		let gotcha = 'no'
		let other = 'no'

		err.catch('not_mine', function(e){
			gotcha = e
		})
		.catch('other', function(e){
			other = e
		})

		expect(gotcha).to.be.equals('no')
		expect(other).to.be.equals(err)
	})

	it("shouldn't execute other error functions for treatment if specific one was executed", function() {
		class MyException extends Exception{
			constructor(message, cause){
				super(message, cause)
				this.my_error = this.always
			}
		}

		let err = new MyException("my error")

		let gotcha = 'no'
		let other = 'no'

		err.catch('my_error', function(e){
			gotcha = e
		})
		.catch('other', function(e){
			other = e
		})

		expect(gotcha).to.be.equals(err)
		expect(other).to.be.equals('no')
	})

	it("shouldn't execute unkown error functions for treatment", function() {
		class MyException extends Exception{
			constructor(message, cause){
				super(message, cause)
				this.my_error = this.always
			}
		}

		let err = new MyException("my error")

		let gotcha = 'no'
		err.catch('not_mine', function(e){
			gotcha = e
		})

		expect(gotcha).to.be.equals('no')
	})
})