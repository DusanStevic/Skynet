package com.tim18.skynet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tim18.skynet.model.FriendRequest;
import com.tim18.skynet.model.RegisteredUser;



@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
	
	
	
	@Query(value="SELECT * FROM friend_request WHERE (received_id = ?1 AND accepted = false)", nativeQuery = true)
	public List<FriendRequest> requestToMe(RegisteredUser u);
	
	@Query(value="SELECT * FROM friend_request WHERE (sent_id = ?1 AND accepted = false)", nativeQuery = true)
	public List<FriendRequest> requestFromMe(RegisteredUser u);
	
	
	@Query(value="SELECT * FROM friend_request WHERE (sent_id = ?1 AND accepted = true) OR (received_id = ?1 AND accepted = true)", nativeQuery = true)
	public List<FriendRequest> friendship(RegisteredUser u);
	
	
	@Query(value="SELECT * FROM friend_request WHERE (received_id = ?1 AND sent_id = ?2 AND accepted = true)", nativeQuery = true)
	public FriendRequest friendshipT(RegisteredUser ru1,RegisteredUser ru2);
	
	@Query(value="SELECT * FROM friend_request WHERE (received_id = ?1 AND sent_id = ?2 AND accepted = false)", nativeQuery = true)
	public FriendRequest friendshipF(RegisteredUser ru1,RegisteredUser ru2);
	
	
	
	
	
}
