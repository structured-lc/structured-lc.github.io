### Leetcode 1480 (Easy): Running Sum of 1d Array [Practice](https://leetcode.com/problems/running-sum-of-1d-array)

### Description  
Given an array of numbers (`nums`), return a new array (`runningSum`) where each element at index *i* of `runningSum` is the sum of all elements of `nums` from index 0 up to and including index *i*.  
In other words, `runningSum[i] = nums + nums[1] + ... + nums[i]`.  
This is sometimes called the prefix sum or cumulative sum problem.

### Examples  

**Example 1:**  
Input: `[1, 2, 3, 4]`  
Output: `[1, 3, 6, 10]`  
*Explanation: running sums are 1, 1+2 = 3, 1+2+3 = 6, 1+2+3+4 = 10.*

**Example 2:**  
Input: `[1, 1, 1, 1, 1]`  
Output: `[1, 2, 3, 4, 5]`  
*Explanation: running sums are 1, 1+1 = 2, 1+1+1 = 3, 1+1+1+1 = 4, 1+1+1+1+1 = 5.*

**Example 3:**  
Input: `[3, 1, 2, 10, 1]`  
Output: `[3, 4, 6, 16, 17]`  
*Explanation: running sums are 3, 3+1 = 4, 3+1+2 = 6, 3+1+2+10 = 16, 3+1+2+10+1 = 17.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to, for each index *i*, sum all values from index 0 to *i*, resulting in an O(n²) algorithm—since each sum recomputes a lot of overlapping values.  
But we can optimize by noticing that each running sum builds on the previous one:  
- runningSum is always nums  
- runningSum[1] can be computed as runningSum + nums[1]  
- runningSum[2] = runningSum[1] + nums[2], etc.  

So, we can iterate through the input array, keep a running total, and fill each position in our result array in O(n) time.  
This removes unnecessary repeated work; it's a standard prefix sum approach, which is optimal for this type of problem.

### Corner cases to consider  
- Input is empty (`[]`) → should return an empty array.
- Input has only one element → output should be the same as input.
- Negative numbers in the input.
- Large input size (test performance).
- Sequence with zeros or repeated values.

### Solution

```python
def runningSum(nums):
    # Initialize the result array
    running = []
    # Variable to store the ongoing sum
    curr_sum = 0
    # Loop through each number in nums
    for num in nums:
        curr_sum += num     # Add current number to sum
        running.append(curr_sum)  # Add sum to result
    return running
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input array.  
  Each element is visited once, and sum/appends are constant time.
- **Space Complexity:** O(n), for storing the resulting running sum array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to do running sum queries and also update elements frequently?
  *Hint: Think about data structures that allow both fast prefix queries and fast updates, such as Fenwick Tree/Binary Indexed Tree or Segment Tree.*

- Can you do this in-place without using extra space for output?
  *Hint: Overwrite the input array as you go.*

- How would you handle an input where the array is too large to fit in memory?
  *Hint: Can process elements in a streaming manner, emitting or storing results as computed, maintaining only the running sum variable.*

### Summary
This problem uses a **prefix sum** (a.k.a. running sum or cumulative sum) pattern. It's fundamental for array and sequence algorithms, especially when dealing with sum queries or partial sums. You iterate once, maintaining a cumulative total, making the solution simple and efficient. This approach generalizes to two-dimensional arrays and more complex range-sum queries (as in Fenwick trees, segment trees, or for interval sums in interview questions).