# 🔍 Problema de DNS - Diagnóstico e Soluções

## ✅ Status Atual

### O que está funcionando:

- ✅ **Cluster MongoDB Atlas**: Ativo e funcionando
- ✅ **Network Access**: Configurado para `0.0.0.0/0`
- ✅ **Connection String**: Correta e formatada
- ✅ **Configuração**: Todas as variáveis de ambiente configuradas
- ✅ **DNS Público (Google 8.8.8.8)**: Consegue resolver os registros SRV

### O que não está funcionando:

- ❌ **DNS Local**: Timeout ao resolver registros SRV
- ❌ **Conexão**: Não consegue conectar ao MongoDB Atlas

## 🔍 Diagnóstico

O problema é que o **DNS local não consegue resolver** os registros SRV do MongoDB Atlas, mas o **DNS público (Google) consegue**. Isso indica:

1. **Problema de DNS local/rede**: O DNS local pode estar lento ou bloqueando
2. **Firewall/Antivírus**: Pode estar bloqueando consultas DNS
3. **Proxy/VPN**: Pode estar interferindo nas consultas DNS
4. **Network Access**: Pode ainda não ter sido aplicado (pode levar 5-15 minutos)

## ✅ Soluções

### Solução 1: Aguardar mais tempo (RECOMENDADO)

O Network Access pode levar **5-15 minutos** para ser aplicado no MongoDB Atlas.

1. Aguarde **10-15 minutos** após configurar o Network Access
2. Teste novamente:
   ```bash
   cd backend
   npm run build
   node dist/scripts/test-connection-direct.js
   ```

### Solução 2: Mudar DNS do Sistema

Configure seu sistema para usar DNS público (Google 8.8.8.8):

**Windows:**

1. Abra **Configurações de Rede**
2. Vá em **Adaptadores de Rede**
3. Clique com botão direito no adaptador de rede
4. Escolha **Propriedades**
5. Selecione **Protocolo IP versão 4 (TCP/IPv4)**
6. Clique em **Propriedades**
7. Selecione **Usar os seguintes endereços de servidor DNS**
8. Digite:
   - DNS preferencial: `8.8.8.8`
   - DNS alternativo: `8.8.4.4`
9. Clique em **OK**
10. Reinicie o computador ou reinicie o adaptador de rede
11. Teste novamente a conexão

**Linux/Mac:**

1. Edite o arquivo `/etc/resolv.conf`:
   ```
   nameserver 8.8.8.8
   nameserver 8.8.4.4
   ```
2. Ou configure via interface gráfica nas configurações de rede
3. Teste novamente a conexão

### Solução 3: Verificar Firewall/Antivírus

1. Verifique se há algum firewall bloqueando
2. Verifique se o antivírus não está bloqueando
3. Temporariamente desabilite o firewall/antivírus para testar
4. Se funcionar, adicione uma exceção para o Node.js

### Solução 4: Verificar Proxy/VPN

1. Verifique se há algum proxy configurado
2. Verifique se há VPN ativa
3. Desabilite proxy/VPN temporariamente para testar
4. Se funcionar, configure o proxy/VPN para permitir conexões MongoDB

### Solução 5: Testar de Outra Rede

1. Teste de outra rede (ex: hotspot do celular)
2. Teste de outro computador na mesma rede
3. Isso ajuda a identificar se o problema é da rede local

### Solução 6: Usar Connection String Alternativa

Se o problema persistir, você pode tentar usar uma connection string sem SRV:

1. No MongoDB Atlas, vá em **Database** → **Connect**
2. Escolha **"Connect your application"**
3. Em vez de `mongodb+srv://`, use `mongodb://` (se disponível)
4. Ou tente obter os IPs diretos dos servidores

## 🧪 Testar DNS

Para verificar se o DNS está funcionando:

```bash
# Testar com DNS do Google
nslookup -type=SRV _mongodb._tcp.agenda-alcantara.dxxyho2.mongodb.net 8.8.8.8

# Testar com DNS local
nslookup -type=SRV _mongodb._tcp.agenda-alcantara.dxxyho2.mongodb.net
```

**Resultado esperado:**

- DNS do Google: ✅ Deve resolver os registros SRV
- DNS local: ❌ Provavelmente timeout

## ⏰ Aguardar Network Access

O Network Access pode levar tempo para ser aplicado:

1. **Primeira vez**: Pode levar **5-15 minutos**
2. **Mudanças**: Podem levar **2-5 minutos**
3. **Propagação**: Pode levar tempo para propagar pela rede

## 🎯 Próximos Passos

1. **Aguardar 10-15 minutos** após configurar Network Access
2. **Testar novamente** a conexão
3. Se não funcionar, **mudar DNS** do sistema para 8.8.8.8
4. Se ainda não funcionar, **verificar firewall/antivírus**
5. Se persistir, **testar de outra rede**

## 📋 Checklist

- [ ] Network Access configurado (0.0.0.0/0)
- [ ] Aguardou 10-15 minutos após configurar
- [ ] DNS do sistema verificado (teste com Google 8.8.8.8)
- [ ] Firewall/Antivírus verificado
- [ ] Proxy/VPN verificado
- [ ] Testado de outra rede (se possível)
- [ ] Testado em outro computador (se possível)

## 🔗 Links Úteis

- MongoDB Atlas: https://cloud.mongodb.com/
- Network Access: https://cloud.mongodb.com/v2#/security/network/whitelist
- DNS do Google: https://developers.google.com/speed/public-dns
