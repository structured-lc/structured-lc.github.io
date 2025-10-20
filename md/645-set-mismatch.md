### Leetcode 645 (Easy): Set Mismatch [Practice](https://leetcode.com/problems/set-mismatch)

### Description  
You are given an array of integers nums, which originally contained all numbers from 1 to n. However, due to an error, one number is duplicated and another number is missing. The task is to find the duplicate and missing numbers, and return them as a two-element list: [duplicate, missing].

### Examples  

**Example 1:**  
Input=`[1, 2, 2, 4]`  
Output=`[2, 3]`  
Explanation: The number 2 appears twice, and the number 3 is missing.

**Example 2:**  
Input=`[3, 2, 3, 1]`  
Output=`[3, 4]`  
Explanation: The number 3 appears twice, and the number 4 is missing.

**Example 3:**  
Input=`[1, 1]`  
Output=`[1, 2]`  
Explanation: The number 1 appears twice, and the number 2 is missing.

### Thought Process

**Brute-Force:**  
First, think about counting frequency with a hash map. For each number from 1 to n, count how often it appears in the array. The number that appears twice is the duplicate, and the one that does not appear is the missing number. This approach runs in O(n) time and O(n) space.

**Optimization:**  
To avoid extra space, use the array itself to mark which numbers have been seen. For each value in the array, use its corresponding index (since the range is 1..n) to mark the presence of that number by flipping the sign. If you encounter a negative number, it means you've seen that value before—that’s the duplicate. After marking, scan the array again: the first positive index (plus 1) is the missing number. This runs in O(n) time and O(1) space.

**Trade-offs:**  
The optimized approach uses in-place modification and does not require extra storage, but mutates the input array (which may not always be acceptable in practice). If the input cannot be modified, the hash map approach is straightforward and easy to understand.

### Corner cases to consider  
- **n = 2, nums = [1, 1]**: Only one duplicate, and the missing is 2.
- **n = 2, nums = [2, 2]**: Only one duplicate, and the missing is 1.
- **Large n**: Array can be up to 10,000 elements, so ensure O(n) and O(1) space.
- **Single element array**: Not possible because n ≥ 2 (per constraints).
- **Consecutive duplicates**: [1, 2, 2, 3] → duplicate is 2, missing is 4.
- **Missing number is n**: In [1, 2, 3, 3], missing is 4, duplicate is 3.

### Solution

```python
def findErrorNums(nums):
    n = len(nums)
    dup = -1
    # Mark elements as seen by flipping the sign at index abs(num)-1
    for num in nums:
        idx = abs(num) - 1
        if nums[idx] < 0:
            dup = abs(num)
        else:
            nums[idx] *= -1
    # Find the missing number (the index +1 where value is still positive)
    missing = -1
    for i in range(n):
        if nums[i] > 0:
            missing = i + 1
            break
    return [dup, missing]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We pass through the array twice, but this is still O(n) overall.
- **Space Complexity:** O(1)  
  We use a constant amount of extra space except for input modifications. No extra data structures are used.

### Potential follow-up questions

**How would you solve it if you were not allowed to modify the input array?**  
Hint: Use a sum/product approach or external array for counting.

**If there are multiple duplicates or missing numbers, how would you generalize your solution?**  
Hint: Think about extending the hash map approach to track more than one exception.

**If the numbers can be any integers (not just 1..n), how would your solution change?**  
Hint: The in-place marking trick relies on 1..n indexing. A hash map is needed for arbitrary integers.

### Summary

This problem involves detecting a duplicate and missing number in a 1..n array by leveraging the array indices as markers—a common pattern in array manipulation problems. The in-place marking technique is efficient and commonly used for such scenarios. This approach is also seen in problems like "Find All Numbers Disappeared in an Array" and "Find the Duplicate Number."


### Flashcard
Mark seen numbers in array by negating at index (num−1); duplicate is where index is already negative, missing is where value remains positive.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Sorting(#sorting)

### Similar Problems
- Find the Duplicate Number(find-the-duplicate-number) (Medium)