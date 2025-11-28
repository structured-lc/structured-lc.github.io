### Leetcode 3289 (Easy): The Two Sneaky Numbers of Digitville [Practice](https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville)

### Description  
You are given an array nums which has length n+2, and contains integers from 0 to n-1 — each integer appears once, except that two of them appear twice (so two numbers are duplicated). Your task is to find and return those two "sneaky" numbers that appear twice. Return them in any order.

### Examples  

**Example 1:**  
Input: `nums = [0,1,1,0]`  
Output: `[0,1]`  
Explanation: Both 0 and 1 appear twice in the array.

**Example 2:**  
Input: `nums = [0,3,2,1,3,2]`  
Output: `[2,3]`  
Explanation: 2 and 3 each appear two times in the array.

**Example 3:**  
Input: `nums = [7,1,5,4,3,4,6,0,9,5,8,2]`  
Output: `[4,5]`  
Explanation: 4 and 5 each appear two times in the array.

### Thought Process (as if you’re the interviewee)  
First, the naive brute-force approach is to count how many times each number appears by scanning the array twice: once to get all possible numbers, and again to count occurrences. However, this is inefficient.

A more efficient (and natural) approach is to use a hashmap or counting array. Since the constraints are small (n ≤ 100), we can use a counting array of size n, or a dictionary, to record how many times each number appears as we iterate over the array once. After that, collect all numbers that appear twice.

This takes only one pass for counting and another quick pass to collect results, and extra space is negligible.

Alternate approaches:
- In larger constraints, we might consider bit manipulation or mathematical methods (like using sums), but with two duplicates and small constraints, a counting array is clearest and fastest.

### Corner cases to consider  
- The array may have the sneaky numbers adjacent or far apart.
- Both sneaky numbers could be the smallest or largest possible numbers (edge values).
- The answer can be in any order (both [a,b] and [b,a] are correct).
- Both sneaky numbers are the same? Not possible by constraints — guaranteed to be two distinct numbers.
- n = 2 (smallest case).

### Solution

```python
def getSneakyNumbers(nums):
    # Initialize a counting array for numbers 0 to n-1.
    n = len(nums) - 2
    count = [0] * n

    # Count how many times each number appears.
    for num in nums:
        count[num] += 1

    sneaky = []
    # Collect the numbers that appear twice.
    for i in range(n):
        if count[i] == 2:
            sneaky.append(i)
            if len(sneaky) == 2:
                break

    return sneaky
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Single pass to count elements and another pass over n possible numbers (which is at most 100).
- **Space Complexity:** O(n) — Counting array of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if the array is read-only?  
  *Hint: Can you use O(1) space with mathematical formulas or bitwise techniques?*

- What if you need to find the two numbers in a streaming fashion (cannot store everything)?  
  *Hint: Use mathematical properties or bit operations for limited storage.*

- How would you find the numbers if you only have access to the array once, and no modification allowed, and space is O(1)?  
  *Hint: Consider using sum and sum of squares to set up simultaneous equations, or use XOR properties.*

### Summary
This solution leverages a classic counting array pattern, exploiting small constraints for clarity and simplicity. It’s highly applicable to similar duplicate-finding problems when the range of elements is known and limited. Variants include using hashmaps for larger ranges, or mathematical/XOR tricks for stricter space requirements — all of which are common patterns in array duplicate/interview questions.


### Flashcard
Use a hash map or counting array to track frequency of each number; iterate once and collect all numbers appearing exactly twice.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math)

### Similar Problems
- Find All Duplicates in an Array(find-all-duplicates-in-an-array) (Medium)