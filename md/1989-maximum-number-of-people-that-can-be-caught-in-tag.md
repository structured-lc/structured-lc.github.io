### Leetcode 1989 (Medium): Maximum Number of People That Can Be Caught in Tag [Practice](https://leetcode.com/problems/maximum-number-of-people-that-can-be-caught-in-tag)

### Description  
You're given an array of 0s and 1s, where 1 represents a person who is "it" and 0 represents a person who is "not it". Each "it" person at index i can catch *at most one* person who is "not it" and whose index is within a distance `dist` of i (i.e., |i - j| ≤ dist). Each "not it" person can be caught by *at most one* "it" person. The task is to find the **maximum number of "not it" people that can be caught** according to these rules.

### Examples  

**Example 1:**  
Input: `team = [0,1,0,1,0], dist = 3`  
Output: `2`  
*Explanation: The "it" at index 1 can catch the "not it" at index 2, and the "it" at index 3 can catch the "not it" at index 4. Maximum 2 people can be caught.*

**Example 2:**  
Input: `team = [1,0,0,0,1], dist = 1`  
Output: `2`  
*Explanation: The "it" at index 0 can catch the "not it" at index 1; "it" at index 4 can catch the "not it" at index 3.*

**Example 3:**  
Input: `team = [1,1,1,0,0,0], dist = 2`  
Output: `2`  
*Explanation: The "it" at index 0 can catch "not it" at index 3, and "it" at index 1 can catch "not it" at index 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each "it" person (team[i] == 1), check all people within distance dist (i-dist to i+dist) and if there is a "not it" (team[j] == 0) not yet caught, pair them. Mark that "not it" as caught so it isn’t caught again. This approach costs O(n×dist).
  
- **Optimal approach:** Since each "it" and "not it" can be used at most once, the problem is similar to a matching problem.  
  A two-pointer technique works efficiently:
  - Keep two pointers: one for "it" and one for "not it".
  - For each "it", move the "not it" pointer to the next available within distance dist.  
  - If a valid catch is possible, increment the result and both pointers.
  - If not (too far ahead), just move the appropriate pointer.

- **Why optimal?** The two-pointer method visits each element at most once, ensuring O(n) time. We guarantee that no "not it" or "it" is used more than once.

### Corner cases to consider  
- Empty array (`[]`)  
- All "it" or all "not it" (no possible catches)  
- dist = 0 (can only catch people at the same index; impossible)  
- Multiple "it" and "not it" clustered together (to test optimal pairing)
- "it" at the first or last position, with "not it" within range

### Solution

```python
def catchMaximumAmountOfPeople(team, dist):
    n = len(team)
    result = 0

    it_idx = 0
    notit_idx = 0

    # Collect indices of "it" and "not it"
    it_list = []
    notit_list = []

    for idx, val in enumerate(team):
        if val == 1:
            it_list.append(idx)
        else:
            notit_list.append(idx)

    # Try to pair each "it" with a "not it" within range
    i, j = 0, 0
    while i < len(it_list) and j < len(notit_list):
        if abs(it_list[i] - notit_list[j]) <= dist:
            # Pair matched: move both pointers
            result += 1
            i += 1
            j += 1
        elif it_list[i] < notit_list[j]:
            # "it" behind, move "it" forward to catch up
            i += 1
        else:
            # "not it" behind, move "not it" forward
            j += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each element in the team is checked at most twice (building index lists + matching work).
- **Space Complexity:** O(n), for storing indices of "it" and "not it" in two separate lists.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each "it" person could catch **up to k** "not it" people, not just one?  
  *Hint: Try to generalize matching logic or model as a flow/network problem.*
  
- What if each "not it" person could also be caught by up to k "it" people?  
  *Hint: Think about assignment and how to maximize pairings based on multiple edges.*

- How would your solution change if team were very large (e.g., streaming input)?  
  *Hint: Focus on in-place matching and O(1) or minimal space.*

### Summary
This problem uses the **two-pointer pattern for greedy matching**, which is common in interval or pairing problems (e.g., assign workers to jobs, minimum platforms for trains). It's a classic greedy assignment, ensuring optimal pairings with minimal iteration, and can be generalized to problems where entities can be paired under certain constraints.


### Flashcard
Use two pointers to greedily match each "it" with the nearest uncaught "not it" within distance, maximizing pairs.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Minimum Number of Food Buckets to Feed the Hamsters(minimum-number-of-food-buckets-to-feed-the-hamsters) (Medium)