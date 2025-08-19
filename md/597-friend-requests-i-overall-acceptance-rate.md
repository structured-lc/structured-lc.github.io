### Leetcode 597 (Easy): Friend Requests I: Overall Acceptance Rate [Practice](https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate)

### Description  
Given two database tables:
- **FriendRequest** (sender_id, send_to_id, request_date): Each row represents a request sent from one user to another on a specific date.
- **RequestAccepted** (requester_id, accepter_id, accept_date): Each row represents the acceptance of a friend request from one user to another on a specific date.

You are asked to compute the **overall acceptance rate** of friend requests.  
- The acceptance rate is defined as:  
  **(number of unique accepted requests) ∕ (number of unique friend requests)**  
- Each (sender, receiver) pair should only be counted once, even if there are duplicate requests or acceptances.
- If there are zero requests, return an acceptance rate of **0.00**.
- Output should be rounded to two decimal places.

### Examples  

**Example 1:**  
Input:  
FriendRequest table:
```
| sender_id | send_to_id | request_date |
|-----------|------------|-------------|
|     1     |     2      | 2016/06/01  |
|     1     |     3      | 2016/06/01  |
|     1     |     4      | 2016/06/01  |
|     2     |     3      | 2016/06/02  |
|     3     |     4      | 2016/06/09  |
```
RequestAccepted table:
```
| requester_id | accepter_id | accept_date |
|--------------|-------------|------------|
|      1       |      2      | 2016/06/03 |
|      1       |      3      | 2016/06/08 |
|      2       |      3      | 2016/06/08 |
|      3       |      4      | 2016/06/09 |
|      3       |      4      | 2016/06/10 |
```
Output: `0.80`  
*Explanation: There are 5 unique requests (1→2, 1→3, 1→4, 2→3, 3→4) and 4 unique accepted requests (1→2, 1→3, 2→3, 3→4). Acceptance rate = 4 ÷ 5 = 0.80.*

**Example 2:**  
Input:  
FriendRequest table: empty  
RequestAccepted table: (any contents)  
Output: `0.00`  
*Explanation: No requests sent means acceptance rate is 0.00.*

**Example 3:**  
Input:  
FriendRequest table:
```
| sender_id | send_to_id | request_date |
|-----------|------------|-------------|
|     1     |     2      | 2016/06/01  |
|     1     |     2      | 2016/06/02  |
|     1     |     2      | 2016/06/03  |
```
RequestAccepted table:
```
| requester_id | accepter_id | accept_date |
|--------------|-------------|------------|
|      1       |      2      | 2016/06/03 |
```
Output: `1.00`  
*Explanation: Although multiple requests and acceptances exist for (1→2), count each pair once. So, 1 unique request and 1 unique acceptance, rate = 1.00.*

### Thought Process (as if you’re the interviewee)  
- **Brute force approach**:  
  - For all rows in FriendRequest, collect all unique pairs (sender_id, send_to_id).
  - For all rows in RequestAccepted, collect all unique pairs (requester_id, accepter_id).
  - Acceptance rate = number of unique acceptances ÷ number of unique requests.
  - If no requests, return 0.00.

- **Optimized/sql approach**:  
  - Use sets (or hash maps) to track unique requests and acceptances efficiently.
  - Deduplicating ensures correct handling even with repeated requests/acceptances.
  - This method makes the computation O(n + m) where n, m are the table sizes.

- **Why this approach**:  
  - Simple to implement, efficient, and directly matches the requirements.
  - Avoids duplicate counting and handles edge cases inherently.

### Corner cases to consider  
- Empty FriendRequest table (should return 0.00)
- Multiple requests/acceptances for the same pair (only count each pair once)
- No acceptances at all (should return 0.00)
- All requests accepted (return 1.00)
- Cases where acceptances exist for non-existent requests (should still divide by total requests)

### Solution

```python
def overall_acceptance_rate(friend_requests, request_accepted):
    # Step 1: Get all unique (sender_id, send_to_id) pairs from friend_requests
    request_pairs = set()
    for req in friend_requests:
        # Each req is a tuple/list: (sender_id, send_to_id, request_date)
        request_pairs.add( (req[0], req[1]) )

    # Step 2: Get all unique (requester_id, accepter_id) pairs from request_accepted
    accepted_pairs = set()
    for acc in request_accepted:
        # Each acc is a tuple/list: (requester_id, accepter_id, accept_date)
        accepted_pairs.add( (acc[0], acc[1]) )

    # Step 3: Calculate acceptance rate: unique acceptances divided by unique requests
    num_requests = len(request_pairs)
    num_accepted = len(accepted_pairs & request_pairs)  # Only count acceptances for valid requests

    # Special case: no requests → return 0.00
    if num_requests == 0:
        return 0.00

    # Calculate rate and round to 2 decimals
    rate = round(num_accepted / num_requests + 1e-8, 2)  # add epsilon to avoid floating issues
    return rate
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of friend_requests and m = number of request_accepted.  
  - Building each set takes O(n) and O(m).
  - Set intersection takes O(min(n, m)).

- **Space Complexity:** O(n + m) for storing both unique request_pairs and accepted_pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you **compute the acceptance rate per month**?  
  *Hint: Group both requests and acceptances by month using the date columns.*

- How would you **compute the cumulative acceptance rate as of each day**?  
  *Hint: Sort by date and, for each date, compute rate up to that day.*

- Could you **efficiently handle millions of rows**?  
  *Hint: Use hashed data structures, indexes, or even SQL aggregation in a database.*

### Summary
This problem utilizes the **hash set pattern** for deduplicating relationships and efficiently computing ratios. It demonstrates careful attention to *unique* entity pairs—common in social network-related questions. This approach is widely applicable for counting unique relationships, deduplication, and aggregate statistics in both code and database (SQL) contexts.

### Tags
Database(#database)

### Similar Problems
