with open('README.md') as f:
    text = f.read().split()

for i in range(len(text)):
    print(f'{i}:', text[i])