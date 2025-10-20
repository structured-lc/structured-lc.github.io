### Leetcode 1852 (Medium): Distinct Numbers in Each Subarray [Practice](https://leetcode.com/problems/distinct-numbers-in-each-subarray)

### Description  
Given an integer array `nums` and an integer `k`, return an array `ans` where `ans[i]` is the number of **distinct** elements in the subarray `nums[i..i+k-1]` for every starting index `i` (0-based), i.e., for every window of size `k` as you scan across `nums`.  
The result should cover the entire windowed scan, so the answer array will be of length `n - k + 1` if the length of `nums` is `n`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,2,2,1,3]`, `k = 3`  
Output: `[3,2,2,2,3]`  
Explanation:  
- Window `[1,2,3]` ⇒ 3 distinct  
- Window `[2,3,2]` ⇒ 2 distinct  
- Window `[3,2,2]` ⇒ 2 distinct  
- Window `[2,2,1]` ⇒ 2 distinct  
- Window `[2,1,3]` ⇒ 3 distinct  

**Example 2:**  
Input: `nums = [1,1,1,1]`, `k = 2`  
Output: `[1,1,1]`  
Explanation:  
Each window `[1,1]` has just 1 distinct element.

**Example 3:**  
Input: `nums = [5,4,4,5,6]`, `k = 4`  
Output: `[3,3]`  
Explanation:  
- Window `[5,4,4,5]` ⇒ numbers {4,5} ⇒ 2 distinct  
- Window `[4,4,5,6]` ⇒ numbers {4,5,6} ⇒ 3 distinct  
Correction for first window: `{4,5}` is only 2, so output should be `[2,3]`.

### Thought Process (as if you’re the interviewee)  
- **Brute-force method:**  
  For every possible window of size `k`, scan through the subarray and count the number of different elements (using a set). This is O(n * k) time, which is likely too slow for large arrays.

- **Optimize using Sliding Window + HashMap:**  
  Instead of recomputing from scratch for each window, keep a sliding count of elements:  
  - Use a map/hashmap to track the count of each number in the current window.  
  - As we slide the window:
    - Add the new entry on the right.
    - Remove the leftmost entry.
    - Keep track of the number of elements with non-zero count, i.e. distinct entries.

- **Why choose this?**  
  This approach is O(n), since each array position is added and removed from the map at most once.

### Corner cases to consider  
- Empty array (`nums = []`)
- `k = 1` (every window is a single element)
- `k` equal to length of `nums` (entire array as a single window)
- All elements the same
- All elements different
- `nums` contains negative as well as positive numbers

### Solution

```python
def distinctNumbers(nums, k):
    # Result array to hold the answer
    ans = []
    # Dictionary to count number frequency in window
    freq = {}
    n = len(nums)
    
    # Initialize the frequency map for the first window
    for i in range(k):
        val = nums[i]
        freq[val] = freq.get(val, 0) + 1
    
    # Add distinct count for first window
    ans.append(len(freq))
    
    # Slide the window through the rest of nums
    for i in range(k, n):
        # Remove the leftmost value of the previous window
        left_val = nums[i - k]
        freq[left_val] -= 1
        if freq[left_val] == 0:
            del freq[left_val]
        
        # Add the new value
        right_val = nums[i]
        freq[right_val] = freq.get(right_val, 0) + 1
        
        # Append the current count of distinct numbers
        ans.append(len(freq))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each element is added and removed from the hash map at most once, and all operations are O(1) on average due to hash map use.

- **Space Complexity:** O(k) in the worst case, if all elements in a window are distinct.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the array is very large and cannot fit in memory?
  *Hint: Think about streaming algorithms or chunk-based solutions.*

- What if k is very large, close to n? Can you optimize further?
  *Hint: See if pre-computation or alternate data structures could help.*

- Can you extend the approach to report the most/least frequent element in each window as well?
  *Hint: Keep a secondary data structure to track the count-to-list-of-elements mapping.*

### Summary
This problem is a classic example of the **sliding window** + **hash map** pattern to solve range distinct counting in linear time.  
Pattern can also be applied to problems like "Longest substring with at most k distinct characters", "Find all anagrams in a string", and many range query/statistics tasks where recalculating from scratch for each window would be inefficient.


### Flashcard
Employ a sliding window approach with a hash map to track unique elements within each window, optimizing the count of distinct numbers.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
