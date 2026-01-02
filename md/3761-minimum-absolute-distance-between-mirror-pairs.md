### Leetcode 3761 (Medium): Minimum Absolute Distance Between Mirror Pairs [Practice](https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs)

### Description  
Given an array of integers `nums`, a mirror pair (i, j) where i < j exists if reversing the digits of nums[i] equals nums[j]. Return the minimum absolute distance |i - j| among all such mirror pairs, or -1 if no mirror pair exists.

### Examples  

**Example 1:**  
Input: `nums = [12,21,45,54]`  
Output: `1`  
*Explanation: Mirror pair (0,1): reverse(12)=21, distance=|0-1|=1. Mirror pair (2,3): reverse(45)=54, distance=1. Minimum distance is 1.*

**Example 2:**  
Input: `nums = `  
Output: `-1`  
*Explanation: Single element, no pair possible with i < j, so return -1.*

**Example 3:**  
Input: `nums = [11,2,3,4]`  
Output: `-1`  
*Explanation: reverse(11)=11 but only at i=0 (no j > i). No other mirror pairs exist.*


### Thought Process (as if you’re the interviewee)  
First, brute force: for each i from 0 to n-2, compute reverse(nums[i]), then scan j > i to find matches and track min |i-j|. This is O(n² × D) where D=digits (~10), too slow for n=10⁵.  

Optimize: Use a hashmap to store the *earliest* (leftmost) index of each number seen so far. Iterate i from left to right: compute target=reverse(nums[i]), check if target exists in map at some prev j < i, update min_dist = i - map[target]. Then store/update map[nums[i]]=i (but only if not seen or take min index). This ensures we find closest possible j for each i in O(1) lookup.  

Trade-offs: Map gives O(n × D) time (D for reverse), perfect. Space O(n) for unique values. Must store leftmost index to minimize distances; rightmost would miss closer pairs.

### Corner cases to consider  
- Array with 1 element: no pairs possible, return -1.  
- All identical elements like [11,11]: reverse(11)=11, so pairs exist with min dist=1.  
- No mirror pairs: e.g., [1,2,3], return -1.  
- Numbers with leading zeros after reverse: e.g., 10 reverses to 01=1, so 10 mirrors 1.  
- Large numbers: up to 10⁹, reverse handles up to 10 digits safely.  
- Duplicate mirrors: e.g., multiple 12s, use leftmost index for min dist.

### Solution

```python
def minimumAbsoluteDifference(nums):
    # Helper to reverse digits of a number (handles 0 correctly)
    def reverse_num(x):
        rev = 0
        while x > 0:
            rev = rev * 10 + x % 10
            x //= 10
        return rev
    
    n = len(nums)
    # Map: value -> leftmost (earliest) index seen
    seen = {}
    min_dist = n + 1  # Impossible large value > any |i-j|
    
    for i in range(n):
        target = reverse_num(nums[i])
        # Check if target seen before i (potential mirror pair j < i)
        if target in seen:
            dist = i - seen[target]
            if dist < min_dist:
                min_dist = dist
        # Store/update leftmost index for nums[i]
        if nums[i] not in seen:
            seen[nums[i]] = i
    
    # If no pairs found, return -1
    return min_dist if min_dist <= n else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × D) where D ≤ 10 (digits in 10⁹); n iterations, each reverse O(D), map ops O(1).  
- **Space Complexity:** O(n) for hashmap storing at most n unique values.


### Potential follow-up questions (as if you’re the interviewer)  

- (Count the number of mirror pairs instead of min distance)  
  *Hint: Modify map to store frequency of each value; add count[target] if exists.*

- (Find max distance instead of min among mirror pairs)  
  *Hint: Track rightmost index per value; use i - rightmost[target] but adjust iteration direction.*

- (Handle multiple test cases or streaming input)  
  *Hint: Reset map per test; for stream, process online as above.*

### Summary
Iterate left-to-right using hashmap for leftmost indices, checking reverse(nums[i]) for prior matches to find min |i-j|. Common two-pointer/hash pattern for pair-finding with transformations (reverse), applicable to palindrome pairs or anagram matches.

### Flashcard
Use hashmap tracking leftmost index of each number; for each i, check if reverse(nums[i]) seen before to get min |i-j| distance in O(1) lookup.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math)

### Similar Problems
