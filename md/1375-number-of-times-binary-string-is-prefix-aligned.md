### Leetcode 1375 (Medium): Number of Times Binary String Is Prefix-Aligned [Practice](https://leetcode.com/problems/number-of-times-binary-string-is-prefix-aligned)

### Description  
Given a permutation of numbers `1` to `n` representing the order in which LEDs turn on, find how many moments all turned-on LEDs are **prefix-aligned** (i.e., the first k LEDs are on for some k). At each step, exactly one LED lights up; a moment is "prefix-aligned" if every LED from 1 up to the current maximum is on and no holes exist.

### Examples  

**Example 1:**  
Input: `flips = [2,1,3,5,4]`  
Output: `3`  
*Explanation: LEDs light as [0,0,0,0,0] → [0,1,0,0,0] → [1,1,0,0,0]. After second flip, positions 1..2 are on. Continue: at steps where number of "on" equals the max so far, count one prefix-aligned moment. Happens 3 times: steps 2, 3, 5.*

**Example 2:**  
Input: `flips = [3,2,4,1,5]`  
Output: `2`  
*Explanation: After flip 2 (positions 3,2 on), still not a prefix; but after flip 4 (positions 3,2,4,1), all from 1..4 are on (no holes). Happened twice overall.*

**Example 3:**  
Input: `flips = [4,1,2,3]`  
Output: `1`  
*Explanation: Prefix-aligned only after step 4 (leds 1-4 on).* 

### Thought Process (as if you’re the interviewee)  
- Simulate flipping LEDs step by step.
- For prefix alignment, need to check if **all LEDs from 1 to the maximum so far are ON**—i.e., count of ON LEDs equals the maximum flipped position seen so far.
- Counting is enough: At each step, keep two values:
  - max_flipped = maximum of flipped positions seen so far
  - count = total number of LEDs turned on so far
- If `max_flipped == count`, we know all positions 1..max_flipped are ON, i.e., prefix-aligned.

This is O(n), and avoids repeated scans.

### Corner cases to consider  
- Only one LED
- LEDs flipped in perfect order (should be prefix-aligned every step)
- LEDs flipped in reversed order (only prefix-aligned at the end)
- Large values

### Solution

```python
def numTimesAllBlue(flips: list[int]) -> int:
    res = 0
    max_flipped = 0
    for step, flipped in enumerate(flips, 1):
        max_flipped = max(max_flipped, flipped)
        if max_flipped == step:
            res += 1
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Single pass through flips.
- **Space Complexity:** O(1) — Only counters/variables used, not storing state for all LEDs.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you had to actually return the indices of each prefix-aligned moment?  
  *Hint: Collect step when max_flipped == step.*

- How to adapt this to handle an array with duplicate flips or missing positions?  
  *Hint: Behavior undefined, but can you report when impossible?*

- How would this change if the LED strip is circular and prefix alignment wraps from the end to the beginning?  
  *Hint: Need modular arithmetic for indices.*

### Summary
This is a simulation/tracking problem with a one-pass O(n) scan and simple maintenance of maximum and count. The idea of prefix alignment and keeping counters/thresholds appears frequently in array or stream prefix/suffix pattern problems.


### Flashcard
Track the max flipped position and count of ON LEDs; whenever max_flipped = count, the prefix is aligned—increment the answer each time this holds.

### Tags
Array(#array)

### Similar Problems
- Bulb Switcher(bulb-switcher) (Medium)
- Bulb Switcher II(bulb-switcher-ii) (Medium)