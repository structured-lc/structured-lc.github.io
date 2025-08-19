### Leetcode 911 (Medium): Online Election [Practice](https://leetcode.com/problems/online-election)

### Description  
You’re given two integer arrays: **persons** and **times**. Each persons[i] is the candidate receiving the iᵗʰ vote at time times[i] (guaranteed to be strictly increasing). You must support a method **q(t)** which, given a time t, returns the person who was leading the election at time t (include any votes cast at exactly t).  
If there’s a tie, the person who received their latest vote most recently is the leader.

**You need a way to efficiently find the leader at any time t, given a potentially large number of queries.**

### Examples  

**Example 1:**  
Input:  
persons = `[0,1,1,0,0,1,0]`,  
times = `[0,5,10,15,20,25,30]`  
q(3) → `0`  
q(12) → `1`  
q(25) → `1`  
q(15) → `0`  
q(24) → `0`  
q(8) → `1`  
*Explanation:  
- At t=3: Only the first vote (person 0) has happened, leader is 0.  
- At t=12: Votes for times 0,5,10 (candidates 0,1,1) → 0:1 vote, 1:2 votes, leader is 1.  
- At t=25: Up to time 25, 0 has 3 votes and 1 has 3 votes, but last vote among them is for 1 at time 25, so leader is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:**  
  Each time q(t) is called, scan through the votes up to time t, counting votes for each candidate, and determine the leader, resolving ties by most recent.  
  *Cons: O(n) per query – slow if many queries.*

- **Optimizing:**  
  Since times[] is strictly increasing, we can preprocess:  
  - While reading votes, track current leader after each vote and store the leader at each time.  
  - For q(t), use **binary search** to find the largest time ≤ t, and return the leader at that time. Search is O(log n).

- **Trade-offs:**  
  - Preprocessing takes O(n), queries O(log n), space O(n).
  - Efficient for real-time online queries.

### Corner cases to consider  
- Repeated votes for same candidate.
- Multiple candidates tie – latest-vote-winner wins.
- All votes are for one candidate.
- q(t) called with t less than any vote time.
- q(t) called with t larger than the last vote.

### Solution

```python
class TopVotedCandidate:
    def __init__(self, persons, times):
        # Map to store vote counts
        from collections import defaultdict
        self.times = times
        self.leaders = []
        vote_count = defaultdict(int)
        leader = -1
        
        for person in persons:
            vote_count[person] += 1
            # If person's votes >= current leader (tie or new lead), set as leader
            if leader == -1 or vote_count[person] >= vote_count[leader]:
                # In tie, most recent candidate becomes leader
                if leader != person:
                    leader = person
            self.leaders.append(leader)

    def q(self, t):
        # Binary search to find rightmost time ≤ t
        l, r = 0, len(self.times) - 1
        res = 0
        while l <= r:
            m = l + (r - l) // 2
            if self.times[m] <= t:
                res = m
                l = m + 1
            else:
                r = m - 1
        return self.leaders[res]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing: O(n) (one pass to count votes and build leader list)  
  - Each q(t): O(log n) (binary search to find time)
- **Space Complexity:**  
  - O(n) for the leader list and storing the times and input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we have tens of millions of votes and queries?  
  *Hint: Can we compress time steps, or use advanced indexing for faster lookup?*

- How to handle deletions or vote retractions?  
  *Hint: Would require more advanced data structure, maybe persistent segment tree or similar.*

- What if votes are received out of order or timestamps are not strictly increasing?  
  *Hint: Need to sort or reprocess; algorithm as-is depends on monotonic times.*


### Summary
This problem uses the **binary search on timeline pattern**, often applied where queries ask about “the value as of a given time.”  
Preprocessing with running leader lists lets us answer time-based leader queries quickly.  
The pattern applies to any “prefix-winner” queries or tracking time-evolving values efficiently.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Design(#design)

### Similar Problems
- Rank Teams by Votes(rank-teams-by-votes) (Medium)