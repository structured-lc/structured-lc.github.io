### Leetcode 710 (Hard): Random Pick with Blacklist [Practice](https://leetcode.com/problems/random-pick-with-blacklist)

### Description  
Given an integer n and a list of blacklisted numbers (blacklist), you are to design a system that lets you randomly pick an integer in the range 0 to n-1, such that the integer is **not** present in the blacklist. Every valid integer must have an equal probability to be picked. You need to support multiple calls to the pick() function efficiently.  
Think of this as sampling unique random IDs from a set, except there are some "forbidden"/blacklisted numbers to skip.

### Examples  

**Example 1:**  
Input:  
`n = 10, blacklist = [3,5,8]`  
`pick() // could return 0..9 except 3,5,8 (uniformly at random)`

Output:  
Could be `0`, `1`, `2`, `4`, `6`, `7`, or `9` (depending on random pick).  
*Explanation: We must never pick 3, 5, or 8. Each of the remaining numbers must have equal chance. For each call to pick(), the output is any valid value.*


**Example 2:**  
Input:  
`n = 3, blacklist = [1]`  
After calls:  
`["Solution","pick","pick","pick"]`  
`[[3,[1]],[],[],[]]`  
Output:  
`[null,0,0,2]`  
*Explanation: We build the system for numbers \(0,1,2\), with 1 blacklisted, so only choices are 0 and 2. Each pick returns one of these (possibly repeating).*


**Example 3:**  
Input:  
`n = 4, blacklist = [2]`  
After calls:  
`["Solution","pick","pick","pick"]`  
`[[4,[2]],[],[],[]]`  
Output:  
`[null,1,3,1]`  
*Explanation: Only numbers allowed are 0,1,3. Each pick must be uniform random from among these.*


### Thought Process (as if you’re the interviewee)  

Brute-force idea:  
- Keep track of all valid numbers (i.e. those not in blacklist).
- On each pick, randomly pick a number from the valid list.  
- This would work, but if n is huge (say, up to 10⁹) and the blacklist is small, it’s very inefficient in terms of space and time.

Optimizing:  
- We want to avoid actually storing all valid numbers.
- Notice that the actual number of valid choices is k = n - len(blacklist).
- Could we somehow map blacklisted numbers to unused valid numbers in a way that lets us sample from [0, k)?

Efficient approach:  
- Pick a random integer in [0, k).
- If picked value is not in blacklist, we’re done.
- If picked value is in blacklist (because some small blacklisted numbers might fall inside [0, k)), remap it to an allowed number outside [0, k).
- For this, precompute a mapping from every "small" blacklisted number to a non-blacklisted "large" number ≥ k.

Why this works:  
- Any number from 0 to k-1 is picked with equal probability.
- If that number is blacklisted, remap it to a unique valid number outside [0, k).

**Trade-offs:**  
- Construction is O(B), where B is the size of the blacklist, and each pick is O(1).
- Uses a hashmap for remapping only the blacklisted numbers in lower half.

### Corner cases to consider  
- Empty blacklist (should pick among all n numbers).
- All numbers blacklisted except one (only one valid value).
- Blacklist covers numbers beyond n (invalid input, possibly).
- n is very large, blacklist is empty/small (efficiency).
- Blacklist covers first/last numbers in the range.
- Blacklist is empty or covers all but one number.

### Solution

```python
import random

class Solution:
    def __init__(self, n: int, blacklist: list[int]):
        # Set of blacklisted numbers for fast lookup
        self.black = set(blacklist)
        # Count of numbers to allow
        self.k = n - len(blacklist)
        # Will map low blacklisted numbers to high whitelisted numbers
        self.mapping = {}

        # Set of candidate high-end numbers (>= self.k) not in blacklist
        whitelist_high = set(range(self.k, n)) - self.black
        
        # Prepare iterator of whitelisted high values
        w_iter = iter(whitelist_high)
        
        # For each blacklisted number in [0, k), map to a whitelisted number >= k
        for b in blacklist:
            if b < self.k:
                # Assign to next available high whitelisted
                self.mapping[b] = next(w_iter)

    def pick(self) -> int:
        # Pick an index randomly in [0, k)
        x = random.randint(0, self.k - 1)
        # If picked value is blacklisted, remap using mapping
        return self.mapping.get(x, x)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **Initialization:** O(B), where B = len(blacklist), for constructing sets and the mapping.
  - **pick():** O(1), since each pick involves only a random number and quick lookup.

- **Space Complexity:**  
  - O(B) for storing the blacklist set and the mapping dictionary (only for blacklisted numbers in lower half and whitelisted numbers in upper half).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the blacklist is so large it covers most of the range?
  *Hint: Would your mapping still be efficient? What changes?*

- How would you handle dynamic blacklists (add/remove blacklist entries at runtime)?
  *Hint: Could you update your mappings on the fly efficiently?*

- Can this be extended to pick with weights or probabilities?
  *Hint: What changes if each valid number has a distinct weight?*

### Summary
This approach uses **remapping with a hashmap** to simulate random sampling from a set with exclusions, without the overhead of explicitly storing allowed numbers. The core pattern is **index remapping** and is a powerful technique when needing random selection under constraints on very large neighborhoods with sparse exceptions. This idea appears in sampling, shuffling, and problems involving random access while skipping forbidden elements.


### Flashcard
Map blacklisted numbers in [0, k) to valid numbers in [k, n) to simulate random pick without storing all valid numbers.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Binary Search(#binary-search), Sorting(#sorting), Randomized(#randomized)

### Similar Problems
- Random Pick Index(random-pick-index) (Medium)
- Random Pick with Weight(random-pick-with-weight) (Medium)
- Find Unique Binary String(find-unique-binary-string) (Medium)