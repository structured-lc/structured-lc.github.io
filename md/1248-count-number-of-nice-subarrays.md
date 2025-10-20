### Leetcode 1248 (Medium): Count Number of Nice Subarrays [Practice](https://leetcode.com/problems/count-number-of-nice-subarrays)

### Description  
Given an array of integers `nums` and an integer `k`, return the number of "nice" subarrays. A "nice" subarray is one that contains exactly `k` odd numbers.

### Examples  
**Example 1:**  
Input: `nums = [1,1,2,1,1], k = 3`  
Output: `2`  
*Explanation: The subarrays [1,1,2,1,1] and [1,2,1] (from indices 0–4 and 1–3) both have exactly 3 odd numbers.*

**Example 2:**  
Input: `nums = [2,4,6], k = 1`  
Output: `0`  
*Explanation: There are no odd numbers, so no nice subarrays.*

**Example 3:**  
Input: `nums = [2,2,2,1,2,2,1,2,2,2,1], k = 2`  
Output: `16`  
*Explanation: There are many nice subarrays—every way to bracket two odd numbers with evens on the sides.*

### Thought Process (as if you’re the interviewee)  
We need all subarrays where the count of odd numbers is exactly k. Scan and keep track of how many odds have been seen. This is a standard prefix sum/frequency counter trick:
- As you scan, track the "number of odds so far" at every position.
- Keep a hashmap counting how many times each number of odds-so-far has occurred.
- For each position, increment result by number of times (odds_so_far - k) has been seen.

### Corner cases to consider  
- No odd numbers in array (should return 0)
- k = 0
- All numbers odd
- k > total number of odd numbers

### Solution

```python
def numberOfSubarrays(nums, k):
    count = 0
    prefix = {0: 1}
    odds = 0
    for num in nums:
        if num % 2 == 1:
            odds += 1
        if odds - k in prefix:
            count += prefix[odds - k]
        prefix[odds] = prefix.get(odds, 0) + 1
    return count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), since we scan nums once.
- **Space Complexity:** O(n) max, worst case each odds-so-far value is unique (but generally much less).

### Potential follow-up questions (as if you’re the interviewer)  
- How to modify for "at most k" odd numbers?
  *Hint: Use sliding window approach for at-most-k, then subtract at-most-(k-1) subarrays from at-most-k.*

- How about for even numbers?
  *Hint: Threshold on evens instead of odds, same principle.*

- What if k is very large (much greater than the number of odds in the array)?
  *Hint: Should early return 0 if not enough odds present.*

### Summary
This is a prefix sums with hashmap pattern, common in subarray sum/count problems. The key: mapping running counts and seeing how many times prior runs would have supported the current window.


### Flashcard
Use prefix sum and hashmap to count subarrays where the number of odds so far minus k has been seen before.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- K Divisible Elements Subarrays(k-divisible-elements-subarrays) (Medium)
- Count Subarrays With Fixed Bounds(count-subarrays-with-fixed-bounds) (Hard)
- Ways to Split Array Into Good Subarrays(ways-to-split-array-into-good-subarrays) (Medium)
- Count of Interesting Subarrays(count-of-interesting-subarrays) (Medium)