### Leetcode 3005 (Easy): Count Elements With Maximum Frequency [Practice](https://leetcode.com/problems/count-elements-with-maximum-frequency)

### Description  
Given an array of positive integers, return the **sum of frequencies** of all elements whose frequency is the highest in the array.  
Put simply:  
- Count how many times each number occurs.
- Identify what the maximum frequency is.
- Return the total count (sum of frequencies) of all elements that occur that many times.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,3,1,4]`  
Output: `4`  
*Explanation: 1 appears twice, 2 appears twice, 3 and 4 appear once each. The maximum frequency is 2 (for 1 and 2). So, total = 2 + 2 = 4.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`  
Output: `5`  
*Explanation: Each number appears once; max frequency is 1. There are 5 such elements, sum = 1 + 1 + 1 + 1 + 1 = 5.*

**Example 3:**  
Input: `nums = [10,10,10]`  
Output: `3`  
*Explanation: Only 10 exists, appears 3 times (max frequency is 3). One element × frequency = 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each element, count its frequency, keep track of the max, and finally sum frequencies for all with max frequency.  
  But, repeatedly scanning the array for each element is inefficient (O(n²)).
- **Optimized approach:**  
  - **Step 1:** Use a hash map (dictionary) to count each element’s frequency in one pass.
  - **Step 2:** Find the max frequency.
  - **Step 3:** For each element, if its frequency is max, add its count to a result sum.
  - This is O(n) time (since dictionary operations are O(1)), and only uses extra space for counts.
- Alternative: Since constraints say elements are between 0 and 100, could use an array of size 101 as a counter for even more efficiency.

### Corner cases to consider  
- Empty array (not specified, but should return 0).
- All elements unique (each appears once).
- All elements the same.
- Multiple elements tie for maximum frequency.
- Large array with small range (frequencies much larger than 1).
- Single element array.

### Solution

```python
def max_frequency_elements(nums):
    # Handle edge case: empty input
    if not nums:
        return 0

    # Step 1: Count the frequency of each element using a dictionary
    count_dict = {}
    for num in nums:
        if num in count_dict:
            count_dict[num] += 1
        else:
            count_dict[num] = 1

    # Step 2: Find the maximum frequency
    max_freq = 0
    for freq in count_dict.values():
        if freq > max_freq:
            max_freq = freq

    # Step 3: Sum up the frequencies of all elements with maximum frequency
    total = 0
    for freq in count_dict.values():
        if freq == max_freq:
            total += freq

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each pass (counting, finding max, summing with an if) is a linear scan of the input or the frequency dictionary.
- **Space Complexity:** O(u) where u is the number of unique elements (at most 101 since numbers are between 0 and 100).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range of possible numbers was much larger (e.g., up to 10⁹)?
  *Hint: Could you still use array counters? What would change?*

- Could you solve this in a single scan, without first finding the max and then summing?
  *Hint: Is there a way to keep a running sum and max in a single loop?*

- What if you needed to return the actual elements (not just the sum) that occur most frequently?
  *Hint: Think about how to gather keys as you scan for max frequency.*

### Summary
This problem is a direct application of the **frequency counter** (hash map/dictionary) pattern, which is very common for counting elements and then selecting based on counts.  
It's a variant of finding mode(s) in an array.  
This pattern appears in problems with "top K frequent," "find the mode," "group by element," etc.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Maximum Frequency of an Element After Performing Operations I(maximum-frequency-of-an-element-after-performing-operations-i) (Medium)
- Maximum Frequency of an Element After Performing Operations II(maximum-frequency-of-an-element-after-performing-operations-ii) (Hard)
- Maximum Difference Between Even and Odd Frequency II(maximum-difference-between-even-and-odd-frequency-ii) (Hard)