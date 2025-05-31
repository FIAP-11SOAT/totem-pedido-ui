export function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const digits = cpf.split('').map(Number);
    const calculateDigit = (factor: number): number => {
        let sum = 0;
        for (let i = 0; i < factor - 1; i++) {
            sum += digits[i] * (factor - i);
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstDigit = calculateDigit(10);
    if (firstDigit !== digits[9]) {
        return false;
    }

    const secondDigit = calculateDigit(11);
    return secondDigit === digits[10];
}

export function formatCPF(cpf: string): string {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) {
        return cpf; // Return unformatted if length is not 11
    }
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

export function unformatCPF(cpf: string): string {
    return cpf.replace(/[^\d]+/g, '');
}