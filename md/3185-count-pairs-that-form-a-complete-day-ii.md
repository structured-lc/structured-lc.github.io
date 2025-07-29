### Leetcode 3185 (Medium): Count Pairs That Form a Complete Day II [Practice](https://leetcode.com/problems/count-pairs-that-form-a-complete-day-ii)

### Description  
Given an integer array **hours**, where each element represents hours worked by someone, return the number of pairs (i, j) with i < j such that **hours[i] + hours[j]** forms a *complete day* (i.e., is an exact multiple of 24).  
A complete day is any total that equals 24, 48, 72, etc.

### Examples  

**Example 1:**  
Input: `hours = [5, 19, 18, 6, 24]`  
Output: `2`  
*Explanation: The valid pairs are (5,19): 5+19=24; (18,6): 18+6=24.*

**Example 2:**  
Input: `hours = [24, 24, 24]`  
Output: `3`  
*Explanation: All pairs sum to multiples of 24 (24+24=48). Possible pairs: (0,1), (0,2), (1,2).*

**Example 3:**  
Input: `hours = [1, 23, 13, 11, 12]`  
Output: `2`  
*Explanation: (1,23): 24; (13,11): 24.*

### Thought Process (as if you’re the interviewee)  
- Brute-force approach: For every pair (i, j) with i < j, check if hours[i] + hours[j] is a multiple of 24. This is O(n²) and too slow for large n.
- Optimization: Focus on *modulo 24* remainders, since (a + b) % 24 == 0 ⇒ (a%24 + b%24) % 24 == 0.
- So for each hour x, its remainder r = x % 24. For each new x, check how many previous values have remainder (24 - r) % 24.
- Use a counter (hash map or array of size 24, since there are only 24 possible remainders) to tally how many of each remainder have been seen.
- Walk through hours, for each x, increment answer by count of complementary remainder so far, then add current remainder to the map.

### Corner cases to consider  
- Empty array or only one element → Output should be 0 (no pairs).
- All elements multiples of 24.
- Same value repeated several times (e.g., [0,0,0,...]).
- Negative or large values (if input allows).
- Values that sum over 24 but not multiples.

### Solution

```python
def count_pairs(hours):
    # Counter for each possible remainder modulo 24
    cnt = [0] * 24
    ans = 0
    for x in hours:
        r = x % 24
        complement = (24 - r) % 24
        # Add count of currently seen 'complement' values
        ans += cnt[complement]
        # Mark this value's remainder as seen
        cnt[r] += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we make a single pass over the array and access the counter array in constant time per element.
- **Space Complexity:** O(1), since the counter array has fixed size 24, independent of n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the target "day" length was not 24, but given as an argument?
  *Hint: Generalize your code to use modulo 'target' instead of 24.*
- If new hours arrive in an online stream, can you still count efficiently?
  *Hint: Maintain and update your counter on the fly.*
- How would you return the actual pairs, not just the count?
  *Hint: You'd need to keep indices for each remainder, increasing space usage.*

### Summary
This problem uses the **modulo/remainder and complement counting pattern**, which is common in problems asking for pairs that sum to a multiple of some value (e.g., "two sum" modulo). The same pattern applies to finding subarrays or pairs in arrays with a prescribed modular sum, and is useful any time only remainders matter for counting combinations. The fixed, small modulus (24) keeps both time and space low.