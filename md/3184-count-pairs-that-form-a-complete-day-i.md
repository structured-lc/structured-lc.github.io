### Leetcode 3184 (Easy): Count Pairs That Form a Complete Day I [Practice](https://leetcode.com/problems/count-pairs-that-form-a-complete-day-i)

### Description  
Given an integer array `hours` where each element represents a time duration in hours, return the number of pairs of indices (i, j) such that i < j and the sum of hours[i] + hours[j] is an exact multiple of 24. In other words, count the number of unordered pairs whose combined hours make up a whole number of days (24, 48, 72, ... hours).

### Examples  

**Example 1:**  
Input: `hours = [12,12,30,24,24]`  
Output: `2`  
*Explanation: The pairs (0,1) and (3,4) have sums 24 and 48, both multiples of 24.*

**Example 2:**  
Input: `hours = [72,48,24,3]`  
Output: `3`  
*Explanation: The pairs (0,1), (0,2), and (1,2) have sums 120, 96, and 72; all are multiples of 24.*

**Example 3:**  
Input: `hours = [1,23,47,25]`  
Output: `1`  
*Explanation: Only (1,2): 23+47=70 (not), (1,3): 23+25=48 (yes), so only one pair. Pairs (0,1),(0,2), etc. have sum not divisible by 24.*

### Thought Process (as if you’re the interviewee)  
Start with the basic approach:  
- The brute force is to check all pairs (i,j) with i < j for whether (hours[i] + hours[j]) is a multiple of 24.  
- For each pair, check if (hours[i] + hours[j]) % 24 == 0. Count if true.  
- This is O(n²), but with n ≤ 100, it works.

Next, can this be optimized?  
- For each number, store its remainder when divided by 24. For any hours[i], its "complement" to reach a multiple of 24 is (24 - (hours[i] % 24)) % 24.
- As we iterate, count how many prior numbers had the complement remainder using a frequency array.
- Each time, we count the valid pairs before adding the current hours[i] to the map so i < j constraint is kept.
- This reduces us to O(n).

### Corner cases to consider  
- Empty array (not allowed per constraints).
- All pairs invalid (no two sums are a multiple of 24).
- All numbers are the same and 24, so every pair valid.
- Elements are larger than 24 (value not restricted).
- Only one element.
- Complement is 0 (if the mod is 0, complement is 0).

### Solution

```python
def count_pairs(hours):
    # freq[remainder] stores how many previous nums have hours % 24 == remainder
    freq = [0] * 24
    count = 0
    for h in hours:
        rem = h % 24
        # find complement to reach multiple of 24
        complement = (24 - rem) % 24
        count += freq[complement]
        freq[rem] += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in hours. We process each element once and map access is O(1).
- **Space Complexity:** O(1), specifically O(24) as we only need an array of size 24 for remainders.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count pairs for arbitrary k (i.e., sum divisible by arbitrary k instead of 24)?  
  *Hint: Generalize mod calculation and use a frequency map of size k.*

- How would you output the actual valid pairs, not just their count?  
  *Hint: Store previous indices for each remainder and enumerate matches.*

- Can this be done in-place or with less space?  
  *Hint: Since 24 is small, space is already minimal; O(1) space.*

### Summary
This problem uses the "count of pairs with given remainders" pattern, often solved with a hash map or frequency array for modular arithmetic. It's common when you need to pair numbers based on sums divisible by k. Variants appear in array, subarray, and string problems with modular or divisible-by constraints.