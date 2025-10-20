### Leetcode 202 (Easy): Happy Number [Practice](https://leetcode.com/problems/happy-number)

### Description  
Given an integer n, determine if it is a **happy number**.  
A number is called *happy* if, after replacing the number with the sum of the squares of its digits repeatedly, you eventually reach 1. Otherwise, if you fall into a loop (i.e., get stuck cycling through numbers other than 1), the number is said to be not happy.

Example:  
- Start with n = 19  
  - 1² + 9² = 1 + 81 = 82  
  - 8² + 2² = 64 + 4 = 68  
  - 6² + 8² = 36 + 64 = 100  
  - 1² + 0² + 0² = 1  
  Since this sequence leads to 1, 19 is a happy number.

### Examples  

**Example 1:**  
Input: `n = 19`  
Output: `True`  
*Explanation: 1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1. Since we reach 1, return True.*

**Example 2:**  
Input: `n = 2`  
Output: `False`  
*Explanation: 2² = 4, 4² = 16, 1² + 6² = 37, 3² + 7² = 58, 5² + 8² = 89, 8² + 9² = 145, 1² + 4² + 5² = 42, 4² + 2² = 20, 2² + 0² = 4. The process enters a cycle not including 1—thus, n is not happy.*

**Example 3:**  
Input: `n = 7`  
Output: `True`  
*Explanation: 7² = 49, 4² + 9² = 97, 9² + 7² = 130, 1² + 3² + 0² = 10, 1² + 0² = 1. Since we reach 1, return True.*

### Thought Process (as if you’re the interviewee)  
To solve this, first, I need to repeatedly replace n with the sum of the squares of its digits. If n becomes 1, the number is happy.

However, if it falls into a cycle (i.e., we're repeating numbers), n will never reach 1. Therefore, I need to detect cycles.  
A brute-force solution is to keep a set of numbers we've already seen; if a number repeats, we are in a loop and the number isn’t happy.

Alternatively, we could use the Floyd’s Tortoise and Hare algorithm as an optimized cycle-detection approach (constant space), but for coding interviews and clarity, the set approach is usually preferred.

### Corner cases to consider  
- n = 1 (single step, should return True)
- n = 0 (reaches 0² = 0, stuck in loop, so return False)
- n is negative or zero (problem only asks for positive integers, but worth asking the interviewer)
- n has identical digits (e.g. 11, 22), to check cycle detection
- n is already a single digit

### Solution

```python
def isHappy(n: int) -> bool:
    # Helper function to calculate the sum of squares of digits
    def get_next(num):
        total_sum = 0
        while num > 0:
            digit = num % 10
            total_sum += digit * digit
            num //= 10
        return total_sum

    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = get_next(n)
    return n == 1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each iteration processes O(log n) digits; however, the sequence enters a cycle or reaches 1 in a finite number of steps (since the sum of squares of digits for any large n eventually drops below the original n).  
  - Thus, runtime is effectively O(number of intermediate values × log n).

- **Space Complexity:**  
  - O(number of unique numbers seen in sequence), which is bounded and typically small due to cycles in possible digit-square-sum values (e.g., fewer than 1000 for all integers).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the space usage of your cycle detection?
  *Hint: Floyd’s cycle-finding (Tortoise and Hare) can be used.*

- Will your approach work for negative numbers?
  *Hint: Clarify problem constraints regarding sign of input.*

- What is the mathematical reason all unhappy numbers eventually fall into one of a few cycles?
  *Hint: The sum of squares of any number’s digits is strictly less than the original for large n.*

### Summary
This is a classic example of *cycle detection in sequences*, specifically digit transformations.  
The coding pattern is **hashing/visited set for cycle detection**, commonly extended to problems involving repeated number transformations or linked list cycle detection.  
The same logic applies to other digit sum transformation or digital root-related problems.


### Flashcard
Repeatedly replace n with the sum of its digits squared; use a set to detect cycles—if you reach 1, it's happy, else a loop.

### Tags
Hash Table(#hash-table), Math(#math), Two Pointers(#two-pointers)

### Similar Problems
- Linked List Cycle(linked-list-cycle) (Easy)
- Add Digits(add-digits) (Easy)
- Ugly Number(ugly-number) (Easy)
- Sum of Digits of String After Convert(sum-of-digits-of-string-after-convert) (Easy)
- Minimum Addition to Make Integer Beautiful(minimum-addition-to-make-integer-beautiful) (Medium)
- Smallest Value After Replacing With Sum of Prime Factors(smallest-value-after-replacing-with-sum-of-prime-factors) (Medium)
- Count the Digits That Divide a Number(count-the-digits-that-divide-a-number) (Easy)