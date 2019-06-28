package com.tim18.skynet.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.validation.Valid;

import org.joda.time.DateTimeComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.AirlineSearchDTO;
import com.tim18.skynet.dto.DestinationBean;
import com.tim18.skynet.dto.FastSeatReservationDTO;
import com.tim18.skynet.dto.FastSeatReservationDetailsDTO;
import com.tim18.skynet.dto.FlightBean;
import com.tim18.skynet.dto.ImageDTO;
import com.tim18.skynet.dto.RoomSearchDTO;
import com.tim18.skynet.dto.SeatsBean;
import com.tim18.skynet.model.Airline;
import com.tim18.skynet.model.AirlineAdmin;
import com.tim18.skynet.model.Destination;
import com.tim18.skynet.model.FastSeatReservation;
import com.tim18.skynet.model.Flight;
import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.Seat;
import com.tim18.skynet.service.AirlineAdminService;
import com.tim18.skynet.service.impl.AirlineServiceImpl;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.DestinationService;
import com.tim18.skynet.service.impl.FastSeatReservationService;
import com.tim18.skynet.service.impl.FlightService;
import com.tim18.skynet.service.impl.SeatService;

@RestController
public class AirlineController {
	

	@Autowired
	private AirlineAdminService airlineAdminService;
	@Autowired
	private CustomUserDetailsService userInfoService;
	@Autowired
	private AirlineServiceImpl airlineService;
	
	@Autowired
	private DestinationService destinationService;
	
	@Autowired
	private FlightService flightService;
	
	@Autowired
	private SeatService seatService;
	@Autowired
	private FastSeatReservationService fastSeatReservationService;
	
	private static SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy. HH:mm");
	private static SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private static SimpleDateFormat sdf2 = new SimpleDateFormat("dd.MM.yyyy. HH:mm");
	
	@GetMapping(value = "/api/getAirline", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Airline> getAirline() {
		AirlineAdmin user = (AirlineAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Airline airline = user.getAirline();
		if (airline != null) {
			return new ResponseEntity<>(airline, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	//Method for adding new flight
		@RequestMapping(value = "/api/addFlight", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
		@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
		public ResponseEntity<?> addFlight(@RequestBody FlightBean newFlightInfo) throws Exception {

			System.out.println("Uleteo sam u dodavanje letova.");
			AirlineAdmin airlineAdmin = (AirlineAdmin) this.userInfoService
					.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
			Airline a = airlineAdmin.getAirline();
			if (a == null) {
				System.out.println("Flight admin doesnt't have flight company.");
				return new ResponseEntity<>("Flight admin doesnt't have flight company.",HttpStatus.NOT_FOUND);
				
			}
			
			
			Date endDate = sdf1.parse(newFlightInfo.getEndDate_str());
			Date startDate = sdf1.parse(newFlightInfo.getStartDate_str());
			
			//PROVERA NA SEVERU
			
			if (endDate.before(startDate)) {
				//return "End date can not be before start date!";
				return new ResponseEntity<>("End date can not be before start date!",HttpStatus.BAD_REQUEST);
				
			}
			Date today = new Date();
			if (startDate.before(today) || endDate.before(today)) {
				//return "Dates can not be in the past!";
				return new ResponseEntity<>("Dates can not be in the past!",HttpStatus.BAD_REQUEST);
			}
			if (newFlightInfo.getStartDestination().equals(newFlightInfo.getEndDestination())) {
				//return "Start and end destinations must be different!";
				return new ResponseEntity<>("Start and end destinations must be different!",HttpStatus.BAD_REQUEST);
			}
			Destination startDestination = destinationService.findByName(newFlightInfo.getStartDestination());
			Destination endDestination = destinationService.findByName(newFlightInfo.getEndDestination());
			if (startDestination == null || endDestination == null) {
				return null;
			}
			
			List<Seat> seats = new ArrayList<Seat>();
			makeSeats(seats, newFlightInfo.getEconomicCapacity(), "economic");
			makeSeats(seats, newFlightInfo.getBuisinesssCapacity(), "business");
			makeSeats(seats, newFlightInfo.getFirstClassCapacity(), "first class");
			
			
			
			
			Flight newFlight = new Flight(a, startDate, endDate, newFlightInfo.getFlightDuration(),
					newFlightInfo.getFlightLength(), startDestination, endDestination,
					seats, newFlightInfo.getBusinessPrice(), newFlightInfo.getEconomicPrice(), 
					newFlightInfo.getFirstClassPrice());
			flightService.save(newFlight);
			for (Seat seat : seats) {
				seat.setFlight(newFlight);
			}
			
			seatService.saveAll(seats);
			a.getFlights().add(newFlight);
			airlineService.save(a);
			airlineAdminService.save(airlineAdmin);

			return new ResponseEntity<>(newFlight, HttpStatus.CREATED);
		}
		
		private List<Seat> makeSeats(List<Seat> seats, String capacity, String flightClass) {
			System.out.println("KAPACITET KOJI JE STIGAO SA FRONTA:"+capacity);
			int rows = Integer.parseInt(capacity.split("|")[0]);
			System.out.println("BROJ REDOVA NAKO PARSIRANJA:"+rows);
			int columns = Integer.parseInt(capacity.split("|")[2]);
			System.out.println("BROJ KOLONA NAKON PARSIRANJA:"+columns);
			for (int row = 1; row <= rows; row++) {
				for (int col = 1; col <= columns; col++) {
					//Seat s = new Seat(false, row, col, flightClass);
					//System.out.println("JEDNO SEDISTE U LETU:"+s.getFlight().getAirline().getName());
					seats.add(new Seat(false, row, col, flightClass));
				}
			}
			return seats;
		}
		
		
		@RequestMapping(value = "/api/editAirlineImage", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<Airline> editAirlineImage(@RequestBody ImageDTO image) {
			AirlineAdmin user = (AirlineAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
			Airline airline = user.getAirline();
			System.out.println(image.getUrl());
			airline.setImage(image.getUrl());
			user.setAirline(airline);
			return new ResponseEntity<>(airlineService.save(airline), HttpStatus.OK);
		}
		
		@RequestMapping(value = "/api/getAllFlights/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<?> getAllFlights(@PathVariable("id") Long id){
			Airline a = airlineService.findOne(id);
			return new ResponseEntity<>(a.getFlights(), HttpStatus.OK);		
		}
		
		@RequestMapping(value = "/api/getFlight/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<FlightBean> getFlight(@PathVariable("id")Long id){
			System.out.println("ULETEO SAM U PRIKAZ JEDNOG  LETA");
			
			
			Flight f = flightService.findOne(id);
			if (f == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			FlightBean fb = new FlightBean(f, f.getAirline().getName(), sdf2.format(f.getStartDate()),
					sdf2.format(f.getEndDate()));
			System.out.println("ONO STO JE PRONADJENO U BAZI"+f.toString());
			return new ResponseEntity<>(fb, HttpStatus.OK);
			

			
		}
		
		
		@RequestMapping(value = "/api/getFlights/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<Set<Flight>> getFlights(@PathVariable("id")Long id){
			Airline a = airlineService.findOne(id);
			if (a == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				
			}
			Set<Flight> flights = a.getFlights();
			return new ResponseEntity<>(flights, HttpStatus.OK);
		}
		
		
		@RequestMapping(value = "/api/getFlights", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
		public ResponseEntity<?> getFlights(){
			System.out.println("ULETEO SAM U PRIKAZ SVIH LETOVA");
			AirlineAdmin airlineAdmin = (AirlineAdmin) this.userInfoService
					.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
			Airline a = airlineAdmin.getAirline();
			if (a == null) {
				
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				
			}
			
			
			Set<Flight> flights = a.getFlights();
			return new ResponseEntity<>(flights, HttpStatus.OK);
			

			
		}
		
		
		@RequestMapping(value = "/api/getSeatsOnFlight/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<SeatsBean> getSeatsOnFlight(@PathVariable("id") Long id){
			System.out.println("ULETEO SAM U RENDEROVANJE SEDISTA");
			Flight flight = flightService.findOne(id);
			List<Seat> seats = new ArrayList<Seat>();
			int economicCapacity_rows = 0;
			int economicCapacity_columns = 0;
			int buisinesssCapacity_rows = 0;
			int buisinesssCapacity_columns = 0;
			int firstClassCapacity_rows = 0;
			int firstClassCapacity_columns = 0;
			double businessPrice = 0;
			double economicPrice = 0;
			double firstClassPrice = 0;
			for (Seat seat : flight.getSeats()) {
				switch (seat.getTravelClassa()) {
				case "economic":
					seats.add(seat);
					if (seat.getFlight().getEconomicPrice() > economicPrice) {
						economicPrice = seat.getFlight().getEconomicPrice();
					}
					
					
					if (seat.getSeatRow() > economicCapacity_rows) {
						economicCapacity_rows = seat.getSeatRow();
					}
					if (seat.getSeatColumn() > economicCapacity_columns) {
						economicCapacity_columns = seat.getSeatColumn();
					}
				break;
				
				case "business":
					seats.add(seat);
					if (seat.getFlight().getBusinessPrice() > businessPrice) {
						businessPrice = seat.getFlight().getBusinessPrice();
					}
					
					
					if (seat.getSeatRow() > buisinesssCapacity_rows) {
						buisinesssCapacity_rows = seat.getSeatRow();
					}
					if (seat.getSeatColumn() > buisinesssCapacity_columns) {
						buisinesssCapacity_columns = seat.getSeatColumn();
					}
				break;
				
				case "first class":
					seats.add(seat);
					if (seat.getFlight().getFirstClassPrice() > firstClassPrice) {
						firstClassPrice = seat.getFlight().getFirstClassPrice();
					}
					
					
					if (seat.getSeatRow() > firstClassCapacity_rows) {
						firstClassCapacity_rows = seat.getSeatRow();
					}
					if (seat.getSeatColumn() > firstClassCapacity_columns) {
						firstClassCapacity_columns  = seat.getSeatColumn();
					}
				break;

				
				default:
					System.out.println("Invalid Flight class!");    
				}

		
				/*if (seat.getTravelClassa().equals("economic")) {
					seats.add(seat);
					if (seat.getFlight().getEconomicPrice() > economicPrice) {
						economicPrice = seat.getFlight().getEconomicPrice();
					}
					
					
					if (seat.getSeatRow() > economicCapacity_rows) {
						economicCapacity_rows = seat.getSeatRow();
					}
					if (seat.getSeatColumn() > economicCapacity_columns) {
						economicCapacity_columns = seat.getSeatColumn();
					}
				}*/
				
				
			}
			
			System.out.println("BROJ REDOVA U EKONOMSKOJ KLASI:"+economicCapacity_rows);
			System.out.println("BROJ KOLONA U EKONOMSKOJ KLASI:"+economicCapacity_columns);
			System.out.println("CENA U EKONOMSKOJ KLASI:"+economicPrice);
			
			System.out.println("BROJ REDOVA U BUSINESS KLASI:"+buisinesssCapacity_rows);
			System.out.println("BROJ KOLONA U BUSINESS KLASI:"+buisinesssCapacity_columns);
			System.out.println("CENA U BUSINESS KLASI:"+businessPrice);
			
			System.out.println("BROJ REDOVA U FIRST KLASI:"+firstClassCapacity_rows);
			System.out.println("BROJ KOLONA U FIRST KLASI:"+firstClassCapacity_columns);
			System.out.println("CENA U FIRST KLASI:"+firstClassPrice);
			
			SeatsBean sb = new SeatsBean(seats, economicCapacity_rows, economicCapacity_columns, buisinesssCapacity_rows, buisinesssCapacity_columns, firstClassCapacity_rows, firstClassCapacity_columns, businessPrice, economicPrice, firstClassPrice);
			return new ResponseEntity<>(sb, HttpStatus.OK);
		}
	
		
		
		
		
		
		
		@RequestMapping(value = "/api/flightSearch", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<ArrayList<FlightBean>> searchFlights(@RequestBody FlightBean search) throws Exception {
			System.out.println("UPAO SAM U PRETRAGU LETOVA");
			System.out.println("ONO STO JE STIGLO SA FRONTA" + search.toString());
			ArrayList<Flight> flights = new ArrayList<>();
			flights = (ArrayList<Flight>) flightService.findAll();
			ArrayList<FlightBean> foundFlights = new ArrayList<>();
			DateTimeComparator dateTimeComparator = DateTimeComparator.getDateOnlyInstance();
			String companyName = "";
			for (Flight f : flights) {
				//System.out.println("LET KOJI JE PRONADJEN U BAZI:"+f.toString());
				companyName = getCompanyNameForFlight(f);
				System.out.println("IME AEROKOMPANIJE KOJA SPROVODI LET:"+companyName);
				if ((f.getStartDestination().getName().equals(search.getStartDestination())
						|| search.getStartDestination().equals(""))
						&& (f.getEndDestination().getName().equals(search.getEndDestination())
								|| search.getEndDestination().equals(""))
						&& (companyName.equals(search.getFlightCompany()) || search.getFlightCompany().equals(""))
						&& (f.getEconomicPrice() >= search.getMinEconomic() || (search.getMinEconomic() == 0))
						&& (f.getBusinessPrice() >= search.getMinBusiness() || (search.getMinBusiness() == 0))
						&& (f.getFirstClassPrice() >= search.getMinFirstClass() || (search.getMinFirstClass() == 0))
						&& (f.getEconomicPrice() <= search.getMaxEconomic() || (search.getMaxEconomic() == 0))
						&& (f.getBusinessPrice() <= search.getMaxBusiness() || (search.getMaxBusiness() == 0))
						&& (f.getFirstClassPrice() <= search.getMaxFirstClass() || (search.getMaxFirstClass() == 0))
						&& (f.getFlightDuration() == search.getFlightDuration() || search.getFlightDuration() == 0)
						&& (f.getFlightLength() == search.getFlightLength() || search.getFlightLength() == 0)
						&& (search.getStartDate() == null
								|| dateTimeComparator.compare(f.getStartDate(), search.getStartDate()) == 0)
						&& (search.getEndDate() == null
								|| dateTimeComparator.compare(f.getEndDate(), search.getEndDate()) == 0)) {

					foundFlights
							.add(new FlightBean(f, companyName, sdf2.format(f.getStartDate()), sdf2.format(f.getEndDate())));
				}
			}
			System.out.println("\tREZ = " + foundFlights.size());
			return new ResponseEntity<>(foundFlights, HttpStatus.OK);

		}	
		private String getCompanyNameForFlight(Flight flight) {
			String companyName = "";
			for (Airline a : airlineService.findAll()) {
				if (a.getFlights().contains(flight)) {
					companyName = a.getName();
					break;
				}
			}
			return companyName;
		}
	
	
	@RequestMapping(value = "/api/addDestination", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
	// Method for adding new destination on which flight company operates
	public ResponseEntity<Destination>addDestination(@RequestBody DestinationBean destInfo) {
		System.out.println("Uleteo sam u dodavanje destinacije.");
		AirlineAdmin airlineAdmin = (AirlineAdmin) this.userInfoService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Airline a = airlineAdmin.getAirline();
		if (a == null) {
			System.out.println("Flight admin doesnt't have flight company.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
		Destination newDestination = new Destination(destInfo.getName(), destInfo.getDescription(),
				destInfo.getCoordinates());
		destinationService.save(newDestination);
		a.getDestinations().add(newDestination);
		// update flight company
		airlineService.save(a);
		//return newDestination;
		return new ResponseEntity<>(newDestination, HttpStatus.CREATED);
		
		
	}
	
	
	
	
	
	@RequestMapping(value = "/api/getDestinations", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
	// Method returns list of destinations on which flight company operates
	public ResponseEntity<?> getDestinations() throws Exception {
		System.out.println("ULETEO SAM U PRIKAZ SVIH DESTINACIJA");
		AirlineAdmin airlineAdmin = (AirlineAdmin) this.userInfoService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Airline a = airlineAdmin.getAirline();
		if (a == null) {
			System.out.println("Flight admin doesnt't have flight company.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
		
		ArrayList<Destination> destinations = new ArrayList<>();
		for (Destination d : a.getDestinations()) {
			destinations.add(d);
		}
		return new ResponseEntity<>(destinations, HttpStatus.OK);
		

		
	}
	
	@RequestMapping(value = "/api/getDestinations/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	// Method returns list of destinations on which flight company operates
	public ResponseEntity<?> getDestinationsID(@PathVariable("id")Long id) throws Exception {
		Airline a = airlineService.findOne(id);
		if (a == null) {
			System.out.println("Flight admin doesnt't have flight company.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
		return new ResponseEntity<>(a.getDestinations(), HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/api/getDestination/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
	// Method returns list of destinations on which flight company operates
	public ResponseEntity<Destination> getDestination(@PathVariable("id")Long id){
		System.out.println("ULETEO SAM U PRIKAZ JEDNE  DESTINACIJE");
		
		Destination d = destinationService.findOne(id);
		if (d == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		System.out.println("ONO STO JE PRONADJENO U BAZI"+d.toString());
		return new ResponseEntity<>(d, HttpStatus.OK);
		

		
	}
	
	@RequestMapping(value = "/api/updateDestination", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Destination> editDestination(@RequestBody Destination destinationFront) {
		
		System.out.println("ULETEO SAM U UPDATE  DESTINACIJE");
		System.out.println("ONO STO JE STIGLO SA FRONTA"+destinationFront.toString());
		Destination d = destinationService.findOne(destinationFront.getId());
		
		if (d == null) {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		d.setName(destinationFront.getName());
		d.setDescription(destinationFront.getDescription());
		d.setCoordinates(destinationFront.getCoordinates());
		
		Destination destinationEdited = destinationService.save(d);
		return new ResponseEntity<>(destinationEdited, HttpStatus.OK);
		

		
	}
	
	
	
	
	
	
	@RequestMapping( value="api/airline",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public Airline createAirline(@Valid @RequestBody Airline airline) {
		return airlineService.save(airline);
	}
	
	
	

	
	@RequestMapping(value = "api/airlines", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Airline> getAllAirlines() {
		return airlineService.findAll();
	}

	
	@RequestMapping(value = "/api/airlines/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Airline> getAirline(
			@PathVariable(value = "id") Long AirlineId) {
		Airline airline = airlineService.findOne(AirlineId);

		if (airline == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(airline);
	}

	
	@RequestMapping(value = "/api/airlines/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Airline> updateAirline(
			@PathVariable(value = "id") Long AirlineId,
			@Valid @RequestBody Airline a) {

		Airline airline = airlineService.findOne(AirlineId);
		if (airline == null) {
			return ResponseEntity.notFound().build();
		}

		airline.setName(a.getName());
		airline.setAddress(a.getAddress());
		airline.setDescription(a.getDescription());
		

		Airline updateAirline = airlineService.save(airline);
		return ResponseEntity.ok().body(updateAirline);
	}
	
	@RequestMapping(value = "/api/searchedAirlines", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Airline> getSearched(@RequestBody AirlineSearchDTO search) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = null;
		try {
			date1 = sdf.parse(search.getDeparture());
		} catch (ParseException e) {
			System.out.println("Neuspesno parsiranje datuma");
			return null;
		}
		
		
		long passangers = search.getPassangers();
		String name = search.getName();
		String start = search.getStartDestination();
		String end = search.getEndDestination();
		
		if(name == "" || name == null){
			name = null;
		}
		
		List<Airline> airlines = airlineService.search(name, start, end, date1, passangers);
		return airlines;
	}
	
	@RequestMapping(value = "/api/searchedFlights/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Flight> searchFlights(@PathVariable(value = "id") Long id, @RequestBody AirlineSearchDTO search) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d1 = null;
		try {
			d1 = sdf.parse(search.getDeparture());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
			
		return flightService.search(id, search.getStartDestination(), search.getEndDestination(), d1, search.getPassangers());
	}

	
	@RequestMapping(value = "/api/airlines/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Airline> deleteAirline(
			@PathVariable(value = "id") Long AirlineId) {
		Airline airline = airlineService.findOne(AirlineId);

		if (airline != null) {
			airlineService.remove(AirlineId);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/*DODAVANJE BRZOG SEDISTA*/
	@RequestMapping(value = "/api/addFastSeatReservation", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
	public ResponseEntity<List<FastSeatReservation>>  addFastSeatReservation(@RequestBody FastSeatReservationDTO fastSeatReservationDTO) {
		System.out.println("ULETEO SAM U DODAVANJE  BRZE");
		
		AirlineAdmin loggedAdmin = (AirlineAdmin) this.userInfoService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		
		if (loggedAdmin == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		List<FastSeatReservation> fastSeatReservations = new ArrayList<FastSeatReservation>();
		
		if(!fastSeatReservationDTO.getSeats().isEmpty()) {
			
		
		
			
			for (String str : fastSeatReservationDTO.getSeats()) {
				Long flightId = fastSeatReservationDTO.getFlight_id();
				Long seatId = Long.parseLong(str);
				Flight flight = flightService.findOne(flightId);
				Seat s = seatService.findByFlightIdAndId(flightId,seatId);
				s.setFast(true);
				seatService.save(s);
				FastSeatReservation fsr = new FastSeatReservation(s, flight, findPrice(flight, s),
						fastSeatReservationDTO.getDiscount());
				fastSeatReservations.add(fsr);
				fastSeatReservationService.save(fsr);
				loggedAdmin.getAirline().getFastSeatReservation().add(fsr);
				airlineService.save(loggedAdmin.getAirline());
				airlineAdminService.save(loggedAdmin);
				
				
				
				
			
			}
			
			
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			//MORA DA SE REZERVISE LET NEMA REZERVACIJE BEZ LETA
		}
		
		
		
		return new ResponseEntity<>(fastSeatReservations, HttpStatus.OK);
	}
	
	
	
	private double findPrice(Flight f, Seat s) {

		if (s.getTravelClassa().equals("economic")) {
			return f.getEconomicPrice();
		} else if (s.getTravelClassa().equals("business")) {
			return f.getBusinessPrice();
		} else {
			return f.getFirstClassPrice();
		}
	}
	
	
	@RequestMapping(value = "/api/getFastSeatReservations", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
	public ResponseEntity<ArrayList<FastSeatReservationDetailsDTO>> getFastSeatReservations() {
		System.out.println("ULETEO SAM U PRIKAZ  BRZE IZ UGLA AERO ADMINA");
		AirlineAdmin loggedAdmin = (AirlineAdmin) this.userInfoService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		
		
		if (loggedAdmin == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ArrayList<FastSeatReservationDetailsDTO> returnValue = new ArrayList<>();
		String startDate, endDate;
		for (FastSeatReservation fsr : loggedAdmin.getAirline().getFastSeatReservation()) {
			startDate = sdf.format(fsr.getFlight().getStartDate());
			endDate = sdf.format(fsr.getFlight().getEndDate());
			returnValue.add(new FastSeatReservationDetailsDTO(fsr.getId(), fsr.getFlight().getId(),
					fsr.getSeat().getId(), fsr.getOriginPrice(), fsr.getDiscount(), startDate, endDate,
					fsr.getFlight().getStartDestination().getNaziv(),
					fsr.getFlight().getEndDestination().getNaziv(), fsr.getSeat().getSeatRow(),
					fsr.getSeat().getSeatColumn(), fsr.getSeat().getTravelClassa(), fsr.isTaken()));
		}
		return new ResponseEntity<>(returnValue, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/api/removeFastSeatReservation/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_AIRLINE_ADMIN')")
	public ResponseEntity<String> removeFastSeatReservation(@PathVariable("id") Long id) {
		
		
		AirlineAdmin loggedUser = (AirlineAdmin) this.userInfoService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		if (loggedUser == null) {
			return null;
		}
		FastSeatReservation reservation = fastSeatReservationService.findOne(id);
		if (reservation == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (reservation.isTaken()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	
		fastSeatReservationService.remove(id);
		return new ResponseEntity<>("Fast reservation has been successfully removed!",HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/getFastSeatReservations/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<ArrayList<FastSeatReservationDetailsDTO>>getFastSeatReservations(@PathVariable("id") Long id) {
		System.out.println("ULETEO SAM U PRIKAZ  BRZE IZ UGLA USERA");
		Airline airline = airlineService.findOne(id);
		ArrayList<FastSeatReservationDetailsDTO> fastSeatReservations = new ArrayList<>();
		String startDate, endDate;
		Date today = new Date();
		for (FastSeatReservation fastSeatReservation : airline.getFastSeatReservation()) {

			long diffInMillies = fastSeatReservation.getFlight().getStartDate().getTime() - today.getTime();
			long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
			if (fastSeatReservation.isTaken() == false && diff >= 1) {

				startDate = sdf.format(fastSeatReservation.getFlight().getStartDate());
				endDate = sdf.format(fastSeatReservation.getFlight().getEndDate());
				fastSeatReservations.add(new FastSeatReservationDetailsDTO(fastSeatReservation.getId(), fastSeatReservation.getFlight().getId(),
						fastSeatReservation.getSeat().getId(), fastSeatReservation.getOriginPrice(), fastSeatReservation.getDiscount(), startDate, endDate,
						fastSeatReservation.getFlight().getStartDestination().getNaziv(),
						fastSeatReservation.getFlight().getEndDestination().getNaziv(), fastSeatReservation.getSeat().getSeatRow(),
						fastSeatReservation.getSeat().getSeatColumn(), fastSeatReservation.getSeat().getTravelClassa(), fastSeatReservation.isTaken()));
			}
		}
		
		if (fastSeatReservations.size()==0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(fastSeatReservations, HttpStatus.OK);

	}
}
