### Leetcode 412 (Easy): Fizz Buzz [Practice](https://leetcode.com/problems/fizz-buzz)

### Description  
Given a positive integer *n*, return a list of strings representing the numbers from 1 to n, but with a twist:
- For numbers **divisible by 3** only, output **"Fizz"** instead of the number.
- For numbers **divisible by 5** only, output **"Buzz"**.
- For numbers **divisible by both 3 and 5** (i.e., 15), output **"FizzBuzz"**.
- For all other numbers, output their string representation[4].


### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `["1", "2", "Fizz"]`  
*Explanation: 1 and 2 are returned as string. 3 is divisible by 3 so we return "Fizz".*

**Example 2:**  
Input: `n = 5`  
Output: `["1", "2", "Fizz", "4", "Buzz"]`  
*Explanation: 3 → "Fizz"; 5 → "Buzz". All others are string form.*

**Example 3:**  
Input: `n = 15`  
Output: `["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]`  
*Explanation: Each index is checked:  
- Multiples of 3 → "Fizz"  
- Multiples of 5 → "Buzz"  
- Multiples of both 3 and 5 (i.e., 15) → "FizzBuzz"; all others as string.*


### Thought Process (as if you’re the interviewee)  
Start by iterating through the numbers from 1 to *n*.  
At each number:
- First, check if it's divisible by both 3 and 5 (since 15 is the LCM, i.e., n % 15 == 0). If so, output "FizzBuzz".
- If not, check for divisibility by 3 (n % 3 == 0) for "Fizz".
- Then check for divisibility by 5 (n % 5 == 0) for "Buzz".
- If none of the above, just return the number as a string.

**Why this check order?**  
Checking "FizzBuzz" first is important—otherwise, for multiples of 15, you'd just get "Fizz" or "Buzz" but never "FizzBuzz".

**Trade-offs:**  
- The brute-force iterative approach is simple and fast for small constraints (n ≤ 10,000 is typical for LeetCode; even for larger n this is efficient).
- The solution is clear and direct, maintaining O(n) time and space.


### Corner cases to consider  
- n = 1 (Should return ["1"])
- n = 0 (No output, but not required by constraints)
- Large n (Make sure you're not exceeding memory or taking too long)
- All numbers are divisible by 3 or 5 (rare, but test e.g., n = 15)
- No numbers are divisible by 3 or 5 (e.g., n = 2)


### Solution

```python
def fizzBuzz(n):
    result = []
    for i in range(1, n+1):
        # Check for divisibility by both 3 and 5 first
        if i % 15 == 0:
            result.append("FizzBuzz")
        # Only divisible by 3
        elif i % 3 == 0:
            result.append("Fizz")
        # Only divisible by 5
        elif i % 5 == 0:
            result.append("Buzz")
        # Not divisible by 3 or 5
        else:
            result.append(str(i))
    return result
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We loop from 1 to n once, doing constant-time work per iteration.

- **Space Complexity:** O(n).  
  We store n strings in the output list.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to support a list of arbitrary divisibility rules, not just for 3 and 5?
  *Hint: Think about using a data structure to map divisors to their outputs for easier extension.*

- Can you do Fizz Buzz **in-place** modifying an existing array?
  *Hint: Given an array nums, overwrite each element with the appropriate string.*

- How might you write this as a generator to yield values one at a time?
  *Hint: Use `yield` to avoid allocating the full output list at once (useful for large n).*


### Summary
This problem uses the **simple iteration pattern** and basic **conditional checks**. It's a common interview screen for testing logic and corner case handling, and the pattern of replacing outputs conditionally is broadly useful (e.g., custom print jobs, dynamic string formatting). Clean order of condition evaluation is crucial to get all rules right.


### Flashcard
Iterate 1 to n checking divisibility—use if-elif chain testing 15 first (for "FizzBuzz"), then 3 ("Fizz"), then 5 ("Buzz"), else return number as string.

### Tags
Math(#math), String(#string), Simulation(#simulation)

### Similar Problems
- Fizz Buzz Multithreaded(fizz-buzz-multithreaded) (Medium)
- Categorize Box According to Criteria(categorize-box-according-to-criteria) (Easy)