Ext.define "stable_mobile.view.horse.Info",
	extend: "Ext.Container"

	controller: 'stable_mobile.controller.horse.InfoViewController'
	requires: ['stable_mobile.controller.horse.InfoViewController']
	
	config:
		masked: false
		cls: 'horse-info'
		itemId: 'horseInfo'
		scrollable: true
		padding: 10
		title: 'Horse Details'
		items: [
			xtype: 'container'
			itemId: 'infoContent'
			cls: 'horse-info'
			html: "<p>loading</p>"
			tpl: """
				<h4><b>Barn name:</b> {name}</h4>
				<hr />
				<tpl if='show_name'>
					<h4><b>Show name:</b> {show_name}</h4>
					<hr />
				</tpl>
				<tpl if='usef_number'>
					<h4><b>USEF #:</b> {usef_number}</h4>
					<hr />
				</tpl>
				<tpl if='owner'>
					<h4><b>Owner:</b> {owner}</h4>
					<hr />
				</tpl>

				<tpl if='lease.person_name'>
					<h4><b>Leased by:</b> {lease.person_name}</h4>
					<hr />
				</tpl>

				<tpl if='lease.price'>
					<h4><b>Lease price:</b> ${lease.price}</h4>
					<hr />
				</tpl>

				<tpl if='lease.start_at'>
					<h4><b>Lease start date:</b> {lease.start_at:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='lease.end_at'>
					<h4><b>Lease end date:</b> {lease.end_at:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='lease.comments'>
					<h4><b>Lease notes:</b> {lease.notes}</h4>
					<hr />
				</tpl>



				<tpl if='gender'>
					<h4><b>Sex:</b> {gender}</h4>
					<hr />
				</tpl>
				<tpl if='display_height'>
					<h4><b>Height:</b> {display_height} hands</h4>
					<hr />
				</tpl>
				<tpl if='age'>
					<h4><b>Age:</b> {age}</h4>
					<hr />
				</tpl>
				<tpl if='color'>
					<h4><b>Color:</b> {color}</h4>
					<hr />
				</tpl>
				<tpl if='markings'>
					<h4><b>Markings:</b> {markings}</h4>
					<hr />
				</tpl>
				<tpl if='breed'>
					<h4><b>Breed:</b> {breed}</h4>
					<hr />
				</tpl>
				<tpl if='brand'>
					<h4><b>Brand:</b> {brand}</h4>
					<hr />
				</tpl>
				<tpl if='tattoo'>
					<h4><b>Tattoo:</b> {tattoo}</h4>
					<hr />
				</tpl>
				<tpl if='microchip'>
					<h4><b>Microchip:</b> {microchip}</h4>
					<hr />
				</tpl>
				

				<tpl if='sire'>
					<h4><b>Sire:</b> {sire}</h4>
					<hr />
				</tpl>
				<tpl if='dam'>
					<h4><b>Dam:</b> {dam}</h4>
					<hr />
				</tpl>
				<tpl if='dam_sire'>
					<h4><b>Dam sire:</b> {dam_sire}</h4>
					<hr />
				</tpl>

				<tpl if='insurance.name'>
					<h4><b>Insurer:</b> {insurance.name}</h4>
					<hr />
				</tpl>
				<tpl if='insurance.policy_number'>
					<h4><b>Insurance policy number:</b> {insurance.policy_number}</h4>
					<hr />
				</tpl>
				<tpl if='insurance.agent'>
					<h4><b>Insurance agent:</b> {insurance.agent}</h4>
					<hr />
				</tpl>
				<tpl if='insurance.phone'>
					<h4><b>Insurance phone:</b> <a href='tel:{insurance.phone}'>{insurance.phone}</a></h4>
					<hr />
				</tpl>

				<tpl if='coggins_date'>
					<h4><b>Coggins renewal date:</b> {coggins_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>
				<tpl if='last_coggins_date'>
					<h4><b>Last coggins date:</b> {last_coggins_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='passport_number'>
					<h4><b>Passport #:</b> {passport_number}</h4>
					<hr />
				</tpl>
				<tpl if='passport_renewal_date'>
					<h4><b>Passport renewal:</b> {passport_renewal_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='fei_number'>
					<h4><b>FEI #:</b> {fei_number}</h4>
					<hr />
				</tpl>
				<tpl if='fei_renewal_date'>
					<h4><b>FEI renewal:</b> {fei_renewal_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='breed_registration_number'>
					<h4><b>Breed registration #:</b> {breed_registration_number}</h4>
					<hr />
				</tpl>
				<tpl if='measurement_card_number'>
					<h4><b>Measurement card #:</b> {measurement_card_number}</h4>
					<hr />
				</tpl>
				<tpl if='ushja_number'>
					<h4><b>USHJA #:</b> {ushja_number}</h4>
					<hr />
				</tpl>
				<tpl if='registration_number_notes'>
					<h4><b>Additional reg #s:</b> {registration_number_notes}</h4>
					<hr />
				</tpl>

				
				<tpl if='allergies'>
					<h4><b>Allergies:</b> {allergies}</h4>
					<hr />
				</tpl>
				<tpl if='vices'>
					<h4><b>Vices:</b> {vices}</h4>
					<hr />
				</tpl>
				
				<tpl if='comments'>
					<h4><b>Notes:</b> {comments}</h4>
					<hr />
				</tpl>
				<tpl if='equipment_notes'>
					<h4><b>Equipment notes:</b> {equipment_notes}</h4>
					<hr />
				</tpl>
				<tpl if='prep_notes'>
					<h4><b>Prep notes:</b> {prep_notes}</h4>
					<hr />
				</tpl>


				<tpl if='am_meal'>
					<h4><b>AM meal:</b> {am_meal}</h4>
					<hr />
				</tpl>
				<tpl if='lunch_meal'>
					<h4><b>Lunch meal:</b> {lunch_meal}</h4>
					<hr />
				</tpl>
				<tpl if='pm_meal'>
					<h4><b>PM meal:</b> {pm_meal}</h4>
					<hr />
				</tpl>
				<tpl if='night_meal'>
					<h4><b>Night-check:</b> {night_meal}</h4>
					<hr />
				</tpl>
				

				<tpl if='purchase_date'>
					<h4><b>Purchase date:</b> {purchase_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='sale_date'>
					<h4><b>Sale date:</b> {sale_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='sale_price'>
					<h4><b>Sale price:</b> ${sale_price}</h4>
					<hr />
				</tpl>

				<tpl if='departure_date'>
					<h4><b>Departure date:</b> {departure_date:date('m/d/Y')}</h4>
					<hr />
				</tpl>

				<tpl if='documents'>
					<h4><b>Documents:</b> 
					<br/>
					<tpl for='documents'>
						<br/>
						<a href='{url}' target='_blank'>{filename}</a>
						<br/>
					</tpl>
					</h4>
					<hr />
				</tpl>

			"""
		]