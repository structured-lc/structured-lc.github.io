### Leetcode 169 (Easy): Majority Element [Practice](https://leetcode.com/problems/majority-element)

### Description  
Given an array of integers `nums`, you are to find the **majority element** — the element that appears **more than ⌊n/2⌋ times**, where `n` is the length of the array. You can assume that **the majority element always exists** in the array.  
Put another way: Return the value that forms "more than half" of the elements. There could be repeats and any order.

### Examples  

**Example 1:**  
Input: `[3,2,3]`  
Output: `3`  
*Explanation: 3 appears twice in an array of length 3 (more than ⌊3/2⌋ = 1 times).*

**Example 2:**  
Input: `[2,2,1,1,1,2,2]`  
Output: `2`  
*Explanation: 2 appears 4 times in an array of length 7 (more than ⌊7/2⌋ = 3 times).*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: The only element is 1, which is by default the majority element.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Count occurrences of every element.  
  Use a nested loop for each value (O(n²)), or use a hashmap/dictionary to store counts while traversing (O(n) time, O(n) space).

- **Optimal (Boyer-Moore Voting Algorithm):**  
  - Since the majority element always exists, we can scan the array and use a `count` and a `candidate`.  
  - When the count hits zero, pick a new candidate.  
  - Increase count for same as candidate, decrease count otherwise.  
  - At the end, the candidate must be the majority.  
  - This method uses O(n) time and O(1) space because it passes the array only once and keeps just two variables.

- **Why choose Boyer-Moore?**  
  - Most efficient in terms of space; doesn't require extra storage.
  - One pass; robust due to problem's guarantee of existence.

- **Trade-offs:**  
  - Frequency counter is very readable but not O(1) space.
  - Sorting is O(n log n) and unnecessary given better options.

### Corner cases to consider  
- Array has only one element: `[x]`
- All elements are the same: `[9,9,9,9]`
- Majority element appears exactly ⌊n/2⌋ + 1 times: `[1,2,1,2,1]`
- The majority element is at the start, middle, or end of the array
- Large arrays (to check efficiency)

### Solution

```python
def majorityElement(nums):
    # Initialize count and candidate for majority element
    count = 0
    candidate = None

    for num in nums:
        # If count is zero, select new candidate
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count += 1  # Same as candidate: increment count
        else:
            count -= 1  # Different element: decrement count

    return candidate
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each element is visited once in the loop.
- **Space Complexity:** O(1)
  - Only two variables are kept regardless of input size (count, candidate).

### Potential follow-up questions (as if you’re the interviewer)  

- What would you change if the majority element was not guaranteed to exist?  
  *Hint: Would you need a validation step after picking the candidate?*

- How would you solve it if the array was extremely large and data could not fit in memory?  
  *Hint: Think about streaming algorithms or multi-pass solutions.*

- Can you find all elements that appear more than ⌊n/3⌋ times?  
  *Hint: Boyer-Moore can be generalized to handle this case; you'd track two candidates.*

### Summary
We use the **Boyer-Moore Voting Algorithm**, a classic pattern for problems involving majority occurrence and guaranteed existence. This algorithm leverages the problem's properties to efficiently "pair out" non-majority elements, resulting in O(n) time and O(1) space.  
The pattern is common to problems involving "more than half" or "more than 1/k portion" occurrences, useful in data streams and arrays where memory efficiency is crucial.

### Tags
Array(#array), Hash Table(#hash-table), Divide and Conquer(#divide-and-conquer), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Majority Element II(majority-element-ii) (Medium)
- Check If a Number Is Majority Element in a Sorted Array(check-if-a-number-is-majority-element-in-a-sorted-array) (Easy)
- Most Frequent Even Element(most-frequent-even-element) (Easy)
- Minimum Index of a Valid Split(minimum-index-of-a-valid-split) (Medium)
- Minimum Operations to Exceed Threshold Value I(minimum-operations-to-exceed-threshold-value-i) (Easy)
- Find the Most Common Response(find-the-most-common-response) (Medium)
- Find Valid Pair of Adjacent Digits in String(find-valid-pair-of-adjacent-digits-in-string) (Easy)