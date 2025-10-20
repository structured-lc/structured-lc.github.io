### Leetcode 995 (Hard): Minimum Number of K Consecutive Bit Flips [Practice](https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips)

### Description  
You are given a binary array nums (only contains 0s and 1s) and an integer k.  
A k-bit flip means you choose a contiguous subarray of size k, and flip all bits (0 ⇒ 1, 1 ⇒ 0) in that window simultaneously.  
Your goal is to turn the entire array into 1s, in as few k-sized flips as possible.  
If it's impossible to do so, return -1.  

For example, for nums = [0,1,0,1,0], k = 3: you can flip windows [0,1,0] (indices 0-2), or [1,0,1] (etc), and so on.

### Examples  

**Example 1:**  
Input: `nums = [0,1,0], k = 1`  
Output: `2`  
Explanation:  
Flip at index 0 → [1,1,0].  
Flip at index 2 → [1,1,1].  
All numbers are now 1.

**Example 2:**  
Input: `nums = [1,1,0], k = 2`  
Output: `-1`  
Explanation:  
Flipping any window of size 2 can't turn the last element into 1; it's impossible.

**Example 3:**  
Input: `nums = [0,0,0,1,0,1,1,0], k = 3`  
Output: `3`  
Explanation:  
Flip at i=0: [1,1,1,1,0,1,1,0]  
Flip at i=4: [1,1,1,1,1,0,0,0]  
Flip at i=5: [1,1,1,1,1,1,1,1]

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all possible positions, flipping every time a 0 is seen. But actually doing the flips each time is expensive and gives O(n × k) time, which is too slow for large n.

- **Optimized Greedy with Difference Array:**  
  The key observation is:
    - Every time we see a 0 at index i, we *must* flip starting at i for the result to be all 1s.
    - Record the effect of each flip using a difference array (delayed/interval flip technique).
    - Instead of flipping bits each time, keep track of the number of ongoing flips that affect the current index.
    - Use a variable to denote the current flip parity; if (current number + flip parity) % 2 == 0, it's 0 and needs flipping.

- **Why this works:**  
  We only flip at the earliest position needed (greedy), and the difference array ensures each position is only affected by previous flips, improving efficiency to O(n).

### Corner cases to consider  
- Empty array: nums = [], k can be any value  
- k = 1 (each flip affects only one bit: must flip every 0)
- k = len(nums) (only one possible flip window, may or may not work)
- Impossible cases: last 0 is within the last k-1 indices (can't flip a window starting here)
- All 1s: nums is already all 1s, should require 0 flips.

### Solution

```python
def minKBitFlips(nums, k):
    n = len(nums)
    flips = 0     # Total number of flips so far
    flip_mark = [0] * n  # To track when the effect of a flip ends
    cur_flips = 0 # Current flip count affecting this position

    for i in range(n):
        # At each step, update current flip count for this position
        if i >= k:
            cur_flips ^= flip_mark[i - k] # Effect ends for window at i-k
            
        # If after all flips so far, this position is still 0
        # (parity: if nums[i] == cur_flips, need to flip)
        if nums[i] == cur_flips:
            if i + k > n:
                return -1  # Can't flip outside array
            flips += 1
            cur_flips ^= 1            # Set that we're flipping from this i
            flip_mark[i] = 1          # Mark - after k steps, effect will end

    return flips
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - One pass through nums, all internal operations are O(1).
- **Space Complexity:** O(n)
  - flip_mark uses extra O(n) storage. The core logic uses only a few variables.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if k can change during each operation?  
  *Hint: Would the greedy left-to-right still work, or do we need DP?*

- Can you do it in-place with O(1) extra space?  
  *Hint: Could you overwrite nums as a marker array? What side effects?*

- What if the array is circular and flips can wrap around?  
  *Hint: Consider modular indexing and flip intervals with wrap.*

### Summary
The optimal approach is a greedy algorithm scanning left-to-right, using a difference array or flip marker to track the current parity caused by previous flips. This “interval flip + prefix sum” trick is common in range-flip or operation tracking interview problems. It effectively reduces expensive subarray operations to efficient O(1) state tracking at each step, and the logic applies broadly to interval manipulation and event processing patterns in competitive coding.


### Flashcard
Greedily flip at every 0 using a difference array to track flip effects; if a flip would exceed array bounds, return −1.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Queue(#queue), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Bulb Switcher(bulb-switcher) (Medium)
- Minimum Time to Remove All Cars Containing Illegal Goods(minimum-time-to-remove-all-cars-containing-illegal-goods) (Hard)
- Number of Distinct Binary Strings After Applying Operations(number-of-distinct-binary-strings-after-applying-operations) (Medium)
- Minimum Operations to Make Binary Array Elements Equal to One I(minimum-operations-to-make-binary-array-elements-equal-to-one-i) (Medium)
- Smallest Number With All Set Bits(smallest-number-with-all-set-bits) (Easy)