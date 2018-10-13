---
layout: page
title: "Contact"
permalink: /contact
---

<div class="row">
	<div class="col-md-5">
		<h2 class="title">Get in Touch</h2>
		<h5 class="description">Please include your name, email, and comment and we'll get back to you shortly.</h5>
	</div>
	<div class="col-md-5 ml-auto">
		<div class="card card-contact">
			<form class="form" action="https://formspree.io/sponsor@techmill.co" method="POST">
				<div class="card-header card-header-raised card-header-success text-center">
					<h4 class="card-title">Contact Us</h4>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group label-floating is-empty bmd-form-group">
								<label class="bmd-label-floating" for="first">First name</label>
								<input type="text" name="first" class="form-control">
								<span class="material-input"></span>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group label-floating is-empty bmd-form-group">
								<label class="bmd-label-floating" for="last">Last name</label>
								<input type="text" name="last" class="form-control">
								<span class="material-input"></span>
							</div>
						</div>
					</div>
					<div class="form-group label-floating is-empty bmd-form-group">
						<label class="bmd-label-floating">Email address</label>
						<input type="email" name="email" class="form-control">
						<span class="material-input"></span>
					</div>
					<div class="form-group label-floating is-empty bmd-form-group">
						<label for="message" class="bmd-label-floating">Your Message</label>
						<textarea name="message" class="form-control" rows="6"></textarea>
						<span class="material-input"></span>
					</div>
				</div>
				<div class="card-footer justify-content-between">
					<input type="text" name="_gotcha" style="display:none" class="form-control">
					<input type="hidden" name="_next" value="//hackntx.com/?thankyou=1">
					<button type="submit" class="btn btn-success pull-right">Send Message</button>
				</div>
			</form>
		</div>
	</div>
</div>
