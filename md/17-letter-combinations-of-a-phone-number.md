### Leetcode 17 (Medium): Letter Combinations of a Phone Number [Practice](https://leetcode.com/problems/letter-combinations-of-a-phone-number)

### Description  
Given a string of digits **from 2 to 9**, return **all possible letter combinations** that the input number could represent, according to the classic phone keypad where each digit maps to certain letters. For example, '2' maps to "abc", '3' to "def", etc. The solution must output all possible combinations in any order. *Digits outside 2-9, like 1 or 0, are not part of the input.*

### Examples  

**Example 1:**  
Input: `digits = "23"`  
Output: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`  
*Explanation: '2' maps to "abc", '3' to "def". Combine every letter of '2' with every letter of '3': (a+d), (a+e), (a+f), (b+d), …*

**Example 2:**  
Input: `digits = ""`  
Output: `[]`  
*Explanation: Input is empty, so no combinations are possible.*

**Example 3:**  
Input: `digits = "2"`  
Output: `["a","b","c"]`  
*Explanation: '2' maps to "abc", so only one-letter combinations.*

### Thought Process (as if you’re the interviewee)  
For this problem, I immediately think of **generating all combinations**, which is a classic scenario for **backtracking**. Each digit maps to a set of letters, so for each position in the input, I need to try every letter corresponding to that digit and recursively move to the next digit.

**Brute-force:**  
I could try to use nested loops for each digit, but since the input size varies, this is not scalable.

**Optimized:**  
Instead, a recursive **backtracking** approach is the best fit because:
- The problem size is small (\(\leq 4\) characters, each mapping to up to 4 letters), so the exponential number of combinations is manageable.
- Backtracking naturally explores all possible letter combinations by building up partial solutions and proceeding step by step.

Alternatively, an **iterative approach** using a queue for building up combinations layer by layer is possible, but backtracking is more intuitive and maintains clarity.

### Corner cases to consider  
- Empty input string `""`
- Single digit input, e.g., `"2"`
- Digits with 3 letters (e.g., `'2','3','4','5','6','8'`)
- Digits with 4 letters (`'7','9'`)
- Very long input (though constraints are usually \(\leq 4\))
- Duplicate or consecutive digits, e.g., `"22"`

### Solution

```python
def letterCombinations(digits):
    # Mapping from digit to corresponding characters.
    phone_map = {
        '2': "abc",
        '3': "def",
        '4': "ghi",
        '5': "jkl",
        '6': "mno",
        '7': "pqrs",
        '8': "tuv",
        '9': "wxyz"
    }
    
    # Result list to collect combinations.
    res = []
    if not digits:
        return res

    # Helper function for backtracking.
    def backtrack(index, path):
        # If the path is the same length as digits, we've formed a valid combination.
        if index == len(digits):
            res.append("".join(path))
            return
        # Fetch possible letters for this digit.
        possible_letters = phone_map[digits[index]]
        for letter in possible_letters:
            # Add letter and proceed to next digit.
            path.append(letter)
            backtrack(index + 1, path)
            # Remove letter to backtrack.
            path.pop()
    
    backtrack(0, [])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(4ⁿ)\) where \(n\) = length of `digits`. Each digit may map to at most 4 letters, and in the worst case, we generate all \(4ⁿ\) combinations (for "7777" etc.).
- **Space Complexity:** \(O(4ⁿ)\) for storing the result array, and up to \(O(n)\) for the recursion stack (where \(n\) is the length of the input).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the digit mapping changed (e.g., international keypads)?
  *Hint: Make the mapping an input parameter.*
- How can you output the combinations in lexicographical order?
  *Hint: Process the letters for each digit sorted.*
- What if you need to return only combinations that exist in a given dictionary?
  *Hint: Prune branches early if the prefix doesn't match any dictionary word.*

### Summary

This problem is a classic use of the **backtracking pattern** for generating all combinations. It's especially useful for scenarios where each stage involves a choice among a set of options (letters mapped to phone digits). The approach is widely applicable to areas such as permutation generation, combinations, password brute-forcing, and more.

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking)

### Similar Problems
- Generate Parentheses(generate-parentheses) (Medium)
- Combination Sum(combination-sum) (Medium)
- Binary Watch(binary-watch) (Easy)
- Count Number of Texts(count-number-of-texts) (Medium)
- Minimum Number of Pushes to Type Word I(minimum-number-of-pushes-to-type-word-i) (Easy)
- Minimum Number of Pushes to Type Word II(minimum-number-of-pushes-to-type-word-ii) (Medium)