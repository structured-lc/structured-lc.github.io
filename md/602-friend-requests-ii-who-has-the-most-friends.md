### Leetcode 602 (Medium): Friend Requests II: Who Has the Most Friends [Practice](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends)

### Description  
Given a table `RequestAccepted` with columns `requester_id`, `accepter_id`, and `accept_date`, each row represents a successful friend request: user `requester_id` sent a request to user `accepter_id` and it was accepted.  
**Your task:**  
Find the user with the **most friends** and the **number of their friends**.  
- Friendship is **bidirectional**—when a friendship is formed, both requester and accepter get one more friend.
- Output should be `[id, num]`, where `id` is the user id with the most friends and `num` is their total number of friends.
- If several users tie, pick the user with the smallest id. (Although constraints or examples usually ensure uniqueness.)

### Examples  

**Example 1:**  
Input:  
`RequestAccepted` =  
```
requester_id | accepter_id | accept_date
------------ | ----------- | -----------
1            | 2           | 2016-06-03
1            | 3           | 2016-06-08
2            | 3           | 2016-06-08
3            | 4           | 2016-06-09
```
Output:  
`id=3, num=3`  
*Explanation:*
- User 1: friends with 2, 3 → 2 friends
- User 2: friends with 1, 3 → 2 friends
- User 3: friends with 1, 2, 4 → 3 friends
- User 4: friends with 3 → 1 friend
User 3 has the most friends: 3.

**Example 2:**  
Input:  
`RequestAccepted` =  
```
requester_id | accepter_id | accept_date
2            | 5           | 2017-03-01
1            | 5           | 2017-03-02
2            | 1           | 2017-03-03
6            | 2           | 2017-03-04
```
Output:  
`id=2, num=3`  
*Explanation:*  
- User 1: friends with 2, 5 → 2 friends  
- User 2: friends with 1, 5, 6 → 3 friends  
- User 5: friends with 1, 2 → 2 friends  
- User 6: friends with 2 → 1 friend  
User 2 has the most friends: 3.

**Example 3:**  
Input:  
`RequestAccepted` =  
```
requester_id | accepter_id | accept_date
1            | 2           | 2020-02-02
1            | 3           | 2020-02-03
2            | 4           | 2020-03-01
3            | 4           | 2020-03-02
```
Output:  
`id=1, num=2`  
*Explanation:*  
- User 1: friends with 2, 3 → 2 friends  
- User 2: friends with 1, 4 → 2 friends  
- User 3: friends with 1, 4 → 2 friends  
- User 4: friends with 2, 3 → 2 friends  
There is a tie (all have 2 friends), but constraint ensures only one output.

### Thought Process (as if you’re the interviewee)  
First, I need to count **how many friends each person has**. Because friendship is mutual (bidirectional), each row connects both `requester_id` and `accepter_id`.  
Brute-force approach: For every user, loop through all records, count appearances as either `requester_id` or `accepter_id`. Inefficient for large input.

Optimization:  
- For each user, count how many times they appear as either `requester_id` or `accepter_id`.
- Combine those counts to get the total number of friends for each user.
- Find the user(s) with the maximum number, and output their id and the number.

Trade-offs:  
- Using a hash map/dictionary is fast and concise.
- We can process all records in a single pass.

### Corner cases to consider  
- No entries in the input table (empty).
- User only appears as requester or only as accepter.
- Duplicate friend pairs (usually prevented by primary key).
- Large number of users with the same max number of friends (ties).
- Users with zero friends (not present in the table).

### Solution

```python
def most_friends(friend_requests):
    # Dictionary to keep count of each user's friends
    friend_count = {}
    for req in friend_requests:
        r, a = req[0], req[1]
        # Add 1 for requester
        friend_count[r] = friend_count.get(r, 0) + 1
        # Add 1 for accepter
        friend_count[a] = friend_count.get(a, 0) + 1
    
    # Find the user with the highest friend count
    max_friends = -1
    max_id = None
    for uid, cnt in friend_count.items():
        if cnt > max_friends or (cnt == max_friends and uid < max_id):
            max_id = uid
            max_friends = cnt
    
    return [max_id, max_friends]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of records in `friend_requests`. Each record processed once.
- **Space Complexity:** O(u), where u = unique users. Each user's friend count is stored in a dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if friendships are not immediately mutual (the table can have pending requests)?  
  *Hint: Only count requests where there is an accepted date.*

- How would you output all users who have the most friends, not just one?  
  *Hint: Collect all user ids with maximum count before returning.*

- What if self-friendships are possible and should be ignored?  
  *Hint: Skip requests where requester_id == accepter_id.*

### Summary

This is a **hash map counting** problem, similar to frequency count or finding top users in a dataset. The trick is to process **both columns** per row and aggregate friend counts symmetrically. Pattern generalizes to problems where relations form undirected graphs, and the goal is to find the node(s) with the highest degree.


### Flashcard
For each user, count appearances as requester or accepter; return user(s) with the highest total friend count.

### Tags
Database(#database)

### Similar Problems
