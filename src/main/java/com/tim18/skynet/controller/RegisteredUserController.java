package com.tim18.skynet.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.FriendRequestDTO;
import com.tim18.skynet.dto.PotentialFriendsDTO;
import com.tim18.skynet.dto.UserDTO;
import com.tim18.skynet.enums.FriendRequestState;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.FriendRequest;

import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.service.CarReservationService;
import com.tim18.skynet.service.FriendRequestService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.RegisteredUserService;





@RestController
public class RegisteredUserController {

	@Autowired
	private RegisteredUserService service;
	
	
	@Autowired
	private FriendRequestService friendRequestService;
	
	private RegisteredUser loggedRegisteredUser() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();		
		if (authentication!=null) {
			String loggedRegisteredUserUsername = authentication.getName();
			RegisteredUser user = (RegisteredUser) service.findByUsername(loggedRegisteredUserUsername);
			return user;
		}
		return null;
	}
	

	@Autowired
	private CustomUserDetailsService userDetailsService;
	@Autowired
	CarReservationService carReservationService;
	
	@GetMapping(value = "/getMyResCars")
	public ResponseEntity<List<CarReservation>> getMyResCars() {
		RegisteredUser logged = (RegisteredUser) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		List<CarReservation> res = carReservationService.findByRegistredUser(logged);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	
	
	@RequestMapping(value = "/api/potentialFriends", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<ArrayList<PotentialFriendsDTO>>potentialFriends(@RequestBody UserDTO potentialFriend) {
		System.out.println("ULETEO SAM U PRETRAGU REGISTROVANIH");
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		if (loggedRegisteredUser == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ArrayList<PotentialFriendsDTO> potentialFriends = new ArrayList<PotentialFriendsDTO>();
		ArrayList<RegisteredUser> users = (ArrayList<RegisteredUser>) service.findAll();
		//struktura friend requestova = 
		//prijatelji (meni uputili zahtev ja ga prihvatio ,ja uputio zahtev neko ga prihvatio) +
		// requestovi koje sam ja poslao(nisu jos prihvaceni) , requestove 
		//koje sam ja primio , a odbio bice u stanju reject pa se zato ne nalaze u strukturi frind requestova
		List<FriendRequest> friendRequests = friendRequestService.requestFromMe(loggedRegisteredUser);
		List<FriendRequest> friends = friendRequestService.friendship(loggedRegisteredUser);
		
		
		for (FriendRequest friendRequest : friends) {
			friendRequests.add(friendRequest);
		}
		
		for (RegisteredUser user : users) {

			if ((user.getName().equals(potentialFriend.getFirstName()) || potentialFriend.getFirstName().equals(""))
					&& (user.getSurname().equals(potentialFriend.getLastName())
							|| potentialFriend.getLastName().equals(""))) {
				
				if (friendRequests.size()> 0) {
					for (FriendRequest friendRequest : friendRequests) {
						if (user.getUsername().equals(friendRequest.getReceived().getUsername()) && friendRequest.getAccepted()== false) {
							potentialFriends.add(new PotentialFriendsDTO(user, FriendRequestState.REQUEST_SENT.getValue()));
						}
						
						if (user.getUsername().equals(friendRequest.getReceived().getUsername()) && friendRequest.getAccepted() == true) {
							potentialFriends.add(new PotentialFriendsDTO(user, FriendRequestState.FRIENDS.getValue()));
						}
						
						if (user.getUsername().equals(friendRequest.getSent().getUsername()) && friendRequest.getAccepted() == true) {
							potentialFriends.add(new PotentialFriendsDTO(user,FriendRequestState.FRIENDS.getValue()));
						}
					}
				}
				
				else {
					potentialFriends.add(new PotentialFriendsDTO(user,FriendRequestState.ADD_FRIEND.getValue()));
				}
				
				
			}
		}
		return new ResponseEntity<>(potentialFriends, HttpStatus.OK);
	}

	
	
	
	@RequestMapping(value = "/api/getMyFriends", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<List<RegisteredUser>> getMyFriends() {
		
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		List<RegisteredUser> friends = new ArrayList<>();
		List<FriendRequest> friendRequests = friendRequestService.friendship(loggedRegisteredUser);
		for (FriendRequest friendRequest : friendRequests) {
			if (loggedRegisteredUser.getId()==friendRequest.getReceived().getId()) {
				friends.add(friendRequest.getSent());
			}
			
			else {
				friends.add(friendRequest.getReceived());
			}
		}
		
		
		return new ResponseEntity<>(friends, HttpStatus.OK);
	}
	
	
	

	
	
	
	@RequestMapping(value = "/api/getMyRequests", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<List<FriendRequest>> getMyRequests() {
		
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		List<FriendRequest> users = friendRequestService.requestToMe(loggedRegisteredUser);
		return new ResponseEntity<>(users, HttpStatus.OK);

	}

	
	

	
	
	@RequestMapping(value = "/api/addFriend/{userId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<FriendRequest> addFriend(@PathVariable Long userId) {
		System.out.println("ULETEO SAM U DODAVANJE  PRIJATELJA");
		
		
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		RegisteredUser ru = service.findOne(userId);

		FriendRequest retVal = friendRequestService
				.create(new FriendRequest(new FriendRequestDTO(loggedRegisteredUser, ru, false)));
		return new ResponseEntity<>(retVal, HttpStatus.CREATED);

	}
	
	

	
	
	@RequestMapping(value = "/api/acceptRequest/{requestId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<FriendRequest> acceptRequest(@PathVariable Long requestId) {
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		RegisteredUser ru = service.findOne(requestId);
		FriendRequest fr = friendRequestService.friendshipF(loggedRegisteredUser,ru);
		fr.setAccepted(true);
		friendRequestService.save(fr);

		return new ResponseEntity<>(fr, HttpStatus.OK);

	}
	
	
	
	
	
	
	
	@RequestMapping(value = "/api/rejectRequest/{requestId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<FriendRequest> rejectRequest(@PathVariable Long requestId) {
		
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		RegisteredUser ru = service.findOne(requestId);
		FriendRequest fr = friendRequestService.friendshipF(loggedRegisteredUser,ru);
		friendRequestService.delete(fr.getId());
		return new ResponseEntity<>(fr, HttpStatus.OK);
	}
	
	
	

	
	
	
	@RequestMapping(value = "/api/removeFriend/{friendId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<FriendRequest> removeFriend(@PathVariable Long friendId) {
		
		RegisteredUser loggedRegisteredUser = loggedRegisteredUser();
		RegisteredUser ru = service.findOne(friendId);
		FriendRequest fr = friendRequestService.friendshipT(loggedRegisteredUser, ru);
		if (fr == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		friendRequestService.delete(fr.getId());
		return new ResponseEntity<>(fr, HttpStatus.OK);
	}

	
	
	
	
	
	
	
	

	

	

}
