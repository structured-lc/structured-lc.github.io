### Leetcode 1303 (Easy): Find the Team Size [Practice](https://leetcode.com/problems/find-the-team-size)

### Description  
You're given an array `arr` where each `arr[i]` represents the person ID of the iᵗʰ person. Each person belongs to a team, and persons on the same team have the same person ID. For every position i, return the size of the team the person at i belongs to, as an array of integers.

### Examples  
**Example 1:**  
Input: `arr = [1, 2, 1, 2, 3]`  
Output: `[2, 2, 2, 2, 1]`  
*Explanation: 1 appears twice, so team size is 2; 2 appears twice; 3 appears once.*

**Example 2:**  
Input: `arr = [4, 4, 4]`  
Output: `[3, 3, 3]`  
*Explanation: All are team 4, size is 3.*

**Example 3:**  
Input: `arr = [3, 3, 5, 3, 5]`  
Output: `[3, 3, 2, 3, 2]`  
*Explanation: 3 appears 3 times, 5 appears 2 times.*


### Thought Process (as if you’re the interviewee)  
- Need to count, for each person's ID, how many total occurrences (team members) are in the array.
- First, count team sizes using a dictionary (Counter).
- Then, overwrite the input (or create a new output array), setting each entry to its team's size by looking it up.
- Simple hash map lookup, O(n) both time and space.


### Corner cases to consider  
- Empty input array: should return an empty array.
- All unique IDs (teams of size 1).
- All IDs the same (one team).
- IDs with varying frequencies scattered in input.


### Solution

```python
def findTeamSize(arr):
    # First pass: count sizes for each team
    from collections import Counter
    count = Counter(arr)
    # Second pass: set each position to its team's size
    return [count[x] for x in arr]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n = len(arr) for counting and for output construction.
- **Space Complexity:** O(n) for the count dictionary and the output.


### Potential follow-up questions (as if you’re the interviewer)  
- How would you solve this if person IDs are very large (huge integer range)?  
  *Hint: Dictionary lookup is still fine, as we only store what's present in arr.*

- How to do it in-place, if allowed?  
  *Hint: You can overwrite arr if output array is not required to be new. Otherwise, can't do in-place if you can't mutate arr.*

- What if you had to group by team and return only the unique team sizes?
  *Hint: Build set of counts, then output sorted list if order required.*

### Summary
Classic use of **hash map counting** to aggregate frequency per group, then mapping input positions to their team's frequency. This pattern appears frequently in data grouping and frequency aggregation tasks.


### Flashcard
Count occurrences of each team ID with a hash map, then set each person's output to their team's size using O(n) time and space.

### Tags
Database(#database)

### Similar Problems
