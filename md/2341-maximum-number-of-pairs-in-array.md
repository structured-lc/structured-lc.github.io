### Leetcode 2341 (Easy): Maximum Number of Pairs in Array [Practice](https://leetcode.com/problems/maximum-number-of-pairs-in-array)

### Description  
Given an integer array `nums`, repeatedly pick any two equal elements and form a pair, removing both from the array. The operation continues until no more pairs can be formed.  
Return a list `[pairs, left]`:  
- `pairs` is the total number of pairs formed,  
- `left` is the number of elements remaining after all pairs are removed.  
Example: For `nums = [1,3,2,1,3,2,2]`, repeatedly remove matching pairs (e.g. two `1`s or two `2`s) until only unpaired elements remain.

### Examples  

**Example 1:**  
Input: `[1,3,2,1,3,2,2]`  
Output: `[3,1]`  
*Explanation:  
Form pairs: (1,1), (3,3), (2,2). Each pair uses two elements.  
Number left: one remaining 2.  
So, 3 pairs and 1 left.*

**Example 2:**  
Input: `[1,1]`  
Output: `[1,0]`  
*Explanation:  
Pair: (1,1). Nothing remains.  
So, 1 pair and 0 left.*

**Example 3:**  
Input: ``  
Output: `[0,1]`  
*Explanation:  
Only one element, cannot form a pair.  
So, 0 pairs and 1 left.*

### Thought Process (as if you’re the interviewee)  
Start with brute force:  
- Walk through the array, for each element, look for a duplicate to form a pair, then remove both.  
- Repeat until no more pairs.  
- This approach is O(n²) due to repeated scans and removals.
  
To optimize:  
- Instead of searching repeatedly, count the frequency of each integer.
- For each count, the number of pairs from that number is count // 2 (i.e. ⌊count/2⌋).  
- Add up total pairs.  
- The number left is the sum of all leftovers (count % 2), or simply the total length minus pairs×2.
  
This approach is O(n) with extra storage for counting, which is efficient and easy to reason about. Frequency counting is common for “pairing/grouping” problems.

### Corner cases to consider  
- Empty array (`[]`) → output should be `[0,0]`
- Array with all elements the same, length even/odd
- Array with all unique elements
- Array with only one element
- Array with large counts (stress test for correctness)
- Numbers outside the normal small range (though constraints usually are 0 ≤ num ≤ 100)

### Solution

```python
def numberOfPairs(nums):
    # Create a fixed-size list for counting,
    # assuming from constraints nums[i] in 0..100
    count = [0] * 101

    # Count occurrences of each value
    for num in nums:
        count[num] += 1

    pairs = 0
    # Each count // 2 forms that many pairs
    for freq in count:
        pairs += freq // 2

    left = len(nums) - pairs * 2
    return [pairs, left]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums). We process the array once to count, then once through the small 0..100 range for counts.
- **Space Complexity:** O(1), technically O(K) where K=101, since counter array is fixed regardless of n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the number range was much larger (e.g., allow negative numbers or numbers up to 10⁹)?  
  *Hint: Use a hash map/dictionary for flexible frequency counting.*

- What if you also had to output the elements of each pair, not just the count?  
  *Hint: Store the actual pairs during counting using an auxiliary structure.*

- Can the problem be solved in-place without extra significant memory?  
  *Hint: Try sorting and scanning for adjacent equal values.*

### Summary
This is a frequency-counting, “bucket” pattern problem—a common approach for situations involving grouping/pairing and element counting.  
It's a useful pattern in problems like anagrams, majority element, and similar grouping exercises, especially when the input domain is bounded.  
If the value range is unbounded, a hash map/dictionary generalizes the approach easily.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Sort Characters By Frequency(sort-characters-by-frequency) (Medium)
- Top K Frequent Words(top-k-frequent-words) (Medium)
- Sort Array by Increasing Frequency(sort-array-by-increasing-frequency) (Easy)