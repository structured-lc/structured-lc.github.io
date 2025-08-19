### Leetcode 3516 (Easy): Find Closest Person [Practice](https://leetcode.com/problems/find-closest-person/)

### Description  
Given a string `corridor` representing a hallway of length `n` where each character is either `'.'` (an empty spot) or a digit `'1'` through `'9'` (a person with a unique identifier), and an integer `targetId`, find the person (other than the one with `targetId`) that is closest in distance to the person with identifier `targetId`. If there is a tie (two people are equally close), return the smaller identifier. If no one else exists, return -1.

### Examples  

**Example 1:**  
Input: `corridor = ".1...3..", targetId = 1`  
Output: `3`  
*Explanation: Person 1 is at position 2 and can reach Person 3 (at position 4) in 2 steps. Only other person is 3.*

**Example 2:**  
Input: `corridor = "..2..4.3", targetId = 2`  
Output: `3`  
*Explanation: Person 3 (index 7) is 5 steps away, Person 4 (index 5) is 3 steps away. Closest is 4. If tie occurs, smallest id returned.*

**Example 3:**  
Input: `corridor = "...5...", targetId = 5`  
Output: `-1`  
*Explanation: There is only one person (id 5), so return -1.*

### Thought Process (as if you’re the interviewee)  
Start by locating the person with targetId in the corridor by scanning for their position. Then, consider all other person identifiers: for each, compute the absolute distance between their position and the target person’s position. Track the minimum such distance. If a tie occurs (two people are equally close), choose the one with the smaller id.  
The brute-force method is O(n): scan, collect locations of all people, then go through to compare distances.  
Given the constraints (corridor length not huge), a simple linear scan is efficient and sufficient.

### Corner cases to consider  
- Only one person in the corridor (return -1).
- Multiple people at same minimum distance to the target (return person with smallest id).
- All spots empty (should not happen as per problem).
- corridor with digits not in sorted/natural order.
- targetId not present (assumed not possible for valid input).

### Solution

```python
def findClosestPerson(corridor: str, targetId: int) -> int:
    # Store indices of all people as {person_id: position}
    people = {}
    for i, ch in enumerate(corridor):
        if ch.isdigit():
            people[int(ch)] = i
    # If only one person or unspecified target, return -1
    if len(people) <= 1 or targetId not in people:
        return -1
    # Position of target person
    target_pos = people[targetId]
    min_dist = float('inf')
    res = -1
    for pid, pos in people.items():
        if pid == targetId:
            continue
        dist = abs(pos - target_pos)
        # If closer, update result; if tie, choose smaller id
        if dist < min_dist or (dist == min_dist and pid < res):
            min_dist = dist
            res = pid
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `corridor`. We linearly scan corridor to build positions and to compare distances.
- **Space Complexity:** O(p), where p is the number of people in the corridor (at most 10), used to store their positions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the identifiers aren't unique, or can be more than single digits?  
  *Hint: How would you parse variable-length IDs, e.g., using regex or multiple consecutive digits?*

- How to handle ties differently, e.g., return the person with largest id?  
  *Hint: You would just adjust the comparison when updating the `res` variable.*

- Can you handle updates, i.e., people moving dynamically?  
  *Hint: Consider a data structure that allows quick updates and distance queries, like a list or balanced BST.*

### Summary
This problem is an instance of the "nearest neighbor" pattern, which comes up when comparing distances in a 1D or 2D context. Here, a basic linear search yields an optimal solution. This scan-and-compare technique can also be applied to computational geometry, clustering, seating problems, or anywhere you need to identify minimum distances among a set of entities.

### Tags
Math(#math)

### Similar Problems
